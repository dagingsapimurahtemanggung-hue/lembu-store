"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { youtubeShortUrl, youtubeThumbnail } from "../lib/site";

export type TvItem = {
  id: string;
  title: string;
  /** Keterangan kecil di atas judul, mis. "Kisah Pak Tasrin · Eps 1 dari 2". */
  label: string;
};

type YTPlayer = {
  loadVideoById(id: string): void;
  playVideo(): void;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
};

type YTNamespace = {
  Player: new (element: HTMLElement, options: Record<string, unknown>) => YTPlayer;
  PlayerState: { ENDED: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApi: Promise<YTNamespace> | null = null;

/** Muat YouTube IFrame API sekali saja; dipakai untuk tahu kapan video selesai. */
function loadYouTubeApi() {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (!youtubeApi) {
    youtubeApi = new Promise<YTNamespace>((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        if (window.YT) {
          resolve(window.YT);
        }
      };

      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        youtubeApi = null;
        reject(new Error("YouTube API gagal dimuat"));
      };
      document.head.appendChild(script);
    });
  }

  return youtubeApi;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Transform yang memindahkan & mengecilkan `from` agar menempati posisi `to`. */
function morphTransform(from: DOMRect, to: DOMRect) {
  return `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width}, ${to.height / from.height})`;
}

type TvPlayerProps = {
  items: TvItem[];
  startIndex: number;
  /** Poster yang diklik; popup "membesar" dari sini dan kembali ke sini saat ditutup. */
  origin: HTMLElement;
  onClose: () => void;
};

export function TvPlayer({ items, startIndex, origin, onClose }: TvPlayerProps) {
  const [index, setIndex] = useState(startIndex);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [closing, setClosing] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const playerReadyRef = useRef(false);
  const indexRef = useRef(startIndex);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const item = items[index];
  const lastIndex = items.length - 1;

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next > lastIndex) {
        return;
      }
      setProgress(0);
      setIndex(next);
    },
    [lastIndex],
  );

  const requestClose = useCallback(() => {
    if (closing) {
      return;
    }
    setClosing(true);

    // Hentikan video dulu: poster di belakangnya terlihat lagi, lalu poster itu yang
    // "mengecil" kembali ke tempat asalnya.
    playerRef.current?.destroy();
    playerRef.current = null;
    playerReadyRef.current = false;
    setFallback(false);
    setReady(false);

    const frame = frameRef.current;
    if (!frame || !origin.isConnected || prefersReducedMotion()) {
      window.setTimeout(onClose, 180);
      return;
    }

    const animation = frame.animate(
      [
        { transform: "none" },
        { transform: morphTransform(frame.getBoundingClientRect(), origin.getBoundingClientRect()) },
      ],
      { duration: 420, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" },
    );
    // Cadangan bila animasi tertahan (tab di latar belakang, perangkat lambat).
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        onClose();
      }
    };
    animation.onfinish = finish;
    window.setTimeout(() => {
      animation.finish();
      finish();
    }, 700);
  }, [closing, onClose, origin]);

  // Buka: poster terbang dari posisinya di halaman ke tengah layar.
  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame || prefersReducedMotion()) {
      const id = window.requestAnimationFrame(() => setReady(true));
      return () => window.cancelAnimationFrame(id);
    }

    const animation = frame.animate(
      [
        {
          transform: morphTransform(frame.getBoundingClientRect(), origin.getBoundingClientRect()),
          borderRadius: "14px",
        },
        { transform: "none", borderRadius: "18px" },
      ],
      { duration: 560, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
    );
    animation.onfinish = () => setReady(true);
    // Cadangan bila animasi tertahan: video tetap dimuat.
    const fallbackTimer = window.setTimeout(() => {
      animation.finish();
      setReady(true);
    }, 900);
    return () => {
      window.clearTimeout(fallbackTimer);
      animation.cancel();
    };
  }, [origin]);

  // Kunci scroll halaman, fokus ke tombol tutup, dan kembalikan fokus saat ditutup.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      origin.focus({ preventScroll: true });
    };
  }, [origin]);

  // Keyboard: Esc tutup, panah pindah episode, Tab tetap di dalam popup.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
      } else if (event.key === "ArrowRight") {
        goTo(indexRef.current + 1);
      } else if (event.key === "ArrowLeft") {
        goTo(indexRef.current - 1);
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], iframe"),
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, requestClose]);

  // Setelah animasi buka selesai: pasang pemutar YouTube.
  useEffect(() => {
    const host = mountRef.current;
    if (!ready || !host) {
      return;
    }

    let cancelled = false;
    const target = document.createElement("div");
    host.appendChild(target);

    const timeout = new Promise<never>((_, reject) =>
      window.setTimeout(() => reject(new Error("timeout")), 6000),
    );

    Promise.race([loadYouTubeApi(), timeout])
      .then((YT) => {
        if (cancelled) {
          return;
        }
        playerRef.current = new YT.Player(target, {
          host: "https://www.youtube-nocookie.com",
          videoId: items[indexRef.current].id,
          width: "100%",
          height: "100%",
          playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1 },
          events: {
            onReady: (event: { target: YTPlayer }) => {
              playerReadyRef.current = true;
              event.target.playVideo();
            },
            onStateChange: (event: { data: number }) => {
              if (event.data === YT.PlayerState.ENDED) {
                goTo(indexRef.current + 1);
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFallback(true);
        }
      });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      playerReadyRef.current = false;
      host.replaceChildren();
    };
  }, [ready, items, goTo]);

  // Ganti episode tanpa membuat ulang pemutar.
  useEffect(() => {
    if (playerReadyRef.current) {
      playerRef.current?.loadVideoById(items[index].id);
    }
  }, [index, items]);

  // Isi bar progres ala Stories.
  useEffect(() => {
    if (!ready) {
      return;
    }
    const timer = window.setInterval(() => {
      const player = playerRef.current;
      if (!player || !playerReadyRef.current) {
        return;
      }
      const duration = player.getDuration();
      if (duration > 0) {
        setProgress(Math.min(1, player.getCurrentTime() / duration));
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [ready]);

  // Gestur sentuh di luar video: geser ke bawah untuk tutup, ke samping untuk ganti episode.
  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) {
      return;
    }
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (dy > 90 && Math.abs(dx) < 70) {
      requestClose();
    } else if (Math.abs(dx) > 70 && Math.abs(dy) < 60) {
      goTo(indexRef.current + (dx < 0 ? 1 : -1));
    }
  };

  return createPortal(
    <div
      ref={dialogRef}
      className={`tv-player ${closing ? "is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tv-player-title"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="tv-backdrop" onClick={requestClose} />
      <div className="tv-bar tv-bar-top" aria-hidden="true" />
      <div className="tv-bar tv-bar-bottom" aria-hidden="true" />

      <button ref={closeRef} className="tv-close" type="button" onClick={requestClose} aria-label="Tutup video">
        <X size={22} />
      </button>

      <div className="tv-stage">
        <div className="tv-screen">
          {items.length > 1 ? (
            <div className="tv-progress" aria-hidden="true">
              {items.map((episode, position) => (
                <span key={episode.id}>
                  <i
                    style={{
                      transform: `scaleX(${position < index ? 1 : position === index ? progress : 0})`,
                    }}
                  />
                </span>
              ))}
            </div>
          ) : null}

          <div ref={frameRef} className="tv-frame">
            <Image
              src={youtubeThumbnail(item.id)}
              alt=""
              fill
              loading="eager"
              sizes="(max-width: 620px) 64vw, 320px"
            />
            {fallback ? (
              <iframe
                key={item.id}
                title={item.title}
                src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&playsinline=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div ref={mountRef} className="tv-mount" />
            )}
          </div>
        </div>

        <div className="tv-info">
          <span className="tv-label">{item.label}</span>
          <h2 id="tv-player-title">{item.title}</h2>

          {items.length > 1 ? (
            <>
              <div className="tv-episodes" role="group" aria-label="Pilih episode">
                {items.map((episode, position) => (
                  <button
                    key={episode.id}
                    type="button"
                    aria-current={position === index}
                    onClick={() => goTo(position)}
                  >
                    Eps {position + 1}
                  </button>
                ))}
              </div>
              <div className="tv-nav">
                <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0}>
                  <ChevronLeft size={18} />
                  Sebelumnya
                </button>
                <button type="button" onClick={() => goTo(index + 1)} disabled={index === lastIndex}>
                  Berikutnya
                  <ChevronRight size={18} />
                </button>
              </div>
            </>
          ) : null}

          <a className="tv-yt" href={youtubeShortUrl(item.id)} target="_blank" rel="noopener noreferrer">
            Buka di YouTube
            <ArrowUpRight size={16} />
          </a>
          <p className="tv-hint tv-hint-pointer">Esc untuk menutup · panah ← → pindah episode</p>
          <p className="tv-hint tv-hint-touch">Geser ke bawah untuk menutup · geser ke samping pindah episode</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
