"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useRef, useState } from "react";
import { mediaFeature, mediaSeries, site, youtubeThumbnail, type MediaSeries } from "../lib/site";
import { TvPlayer, type TvItem } from "./tv-player";

/* Logo merek ditulis inline karena ikon merek tidak tersedia di lucide-react. */
export function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 3c.3 2.2 1.6 3.7 3.9 3.9v3.1c-1.4.1-2.7-.3-3.9-1.1v6.2c0 3.9-3.6 6.5-7.3 5.4-2.3-.7-3.9-2.8-3.8-5.3.1-3.3 3.2-5.7 6.4-5.1v3.2c-1.5-.5-3.1.5-3.2 2.1-.1 1.4 1 2.5 2.4 2.5 1.3 0 2.3-1 2.3-2.4V3h3.2z" />
    </svg>
  );
}

export function FacebookIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
    </svg>
  );
}

/** Pecah handle setelah "_" supaya di layar sempit tidak terpotong di tengah kata. */
function Handle({ value }: { value: string }) {
  const [first, ...rest] = value.split("_");
  return (
    <strong>
      {first}
      {rest.map((part) => (
        <span key={part}>
          _<wbr />
          {part}
        </span>
      ))}
    </strong>
  );
}

type PlayerSession = {
  items: TvItem[];
  index: number;
  origin: HTMLElement;
};

const featureItems: TvItem[] = [
  { id: mediaFeature.id, title: mediaFeature.title, label: "Film utama · Profil" },
];

function seriesItems(series: MediaSeries): TvItem[] {
  return series.episodes.map((episode, position) => ({
    id: episode.id,
    title: episode.title,
    label: `${series.title} · Eps ${position + 1} dari ${series.episodes.length}`,
  }));
}

const tickerItems = ["Sedang tayang", mediaFeature.title, ...mediaSeries.map((series) => series.title)];

type PosterProps = {
  id: string;
  label: string;
  sizes: string;
  priority?: boolean;
  onPlay: (origin: HTMLElement) => void;
  children?: React.ReactNode;
  posterRef?: React.Ref<HTMLButtonElement>;
};

function Poster({ id, label, sizes, priority, onPlay, children, posterRef }: PosterProps) {
  return (
    <button
      ref={posterRef}
      className="tv-poster"
      type="button"
      aria-label={`Putar ${label}`}
      onClick={(event) => onPlay(event.currentTarget)}
    >
      <Image src={youtubeThumbnail(id)} alt="" fill sizes={sizes} priority={priority} />
      <span className="tv-play" aria-hidden="true">
        <Play size={22} fill="currentColor" />
      </span>
      {children ? <span className="tv-poster-meta">{children}</span> : null}
    </button>
  );
}

export function MediaSection() {
  const [session, setSession] = useState<PlayerSession | null>(null);
  const featurePosterRef = useRef<HTMLButtonElement>(null);

  const open = (items: TvItem[], index: number, origin: HTMLElement) => {
    setSession({ items, index, origin });
  };

  return (
    <section className="gallery-section tv-section" id="galeri">
      <div className="section-head split">
        <div>
          <span className="eyebrow">Lembu Lemu TV</span>
          <h2>Informasi dan media sosial kami.</h2>
        </div>
        <p>
          Tonton profil dan cerita di balik Lembu Lemu, lalu ikuti akun resmi kami untuk
          update stok, harga, dan kegiatan harian.
        </p>
      </div>

      <div className="tv-ticker" aria-hidden="true">
        <div className="tv-ticker-track">
          {[0, 1, 2, 3].map((copy) => (
            <span key={copy}>
              {tickerItems.map((text) => (
                <span key={text}>
                  {text}
                  <i>✦</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="tv-wrap">
        <article className="tv-feature">
          <Poster
            posterRef={featurePosterRef}
            id={mediaFeature.id}
            label={mediaFeature.title}
            sizes="(max-width: 620px) 64vw, 320px"
            priority
            onPlay={(origin) => open(featureItems, 0, origin)}
          />
          <div className="tv-feature-copy">
            <span className="tv-kicker">Film utama · Profil</span>
            <h3>{mediaFeature.title}</h3>
            <p className="tv-tagline">{mediaFeature.tagline}</p>
            <ul className="tv-credits" aria-label="Info singkat">
              {mediaFeature.credits.map((credit) => (
                <li key={credit}>{credit}</li>
              ))}
            </ul>
            <button
              className="tv-watch"
              type="button"
              onClick={() => {
                if (featurePosterRef.current) {
                  open(featureItems, 0, featurePosterRef.current);
                }
              }}
            >
              <Play size={18} fill="currentColor" />
              Tonton sekarang
            </button>
          </div>
        </article>

        <div className="tv-series-grid">
          {mediaSeries.map((series) => {
            const items = seriesItems(series);
            return (
              <article className="tv-series" key={series.slug}>
                <header>
                  <span className="tv-kicker">
                    {series.kind} · {series.episodes.length} episode
                  </span>
                  <h3>{series.title}</h3>
                  <p>{series.blurb}</p>
                </header>
                <ol className="tv-episodes-row">
                  {series.episodes.map((episode, position) => (
                    <li key={episode.id}>
                      <Poster
                        id={episode.id}
                        label={`${series.title} episode ${position + 1}: ${episode.title}`}
                        sizes="(max-width: 620px) 44vw, (max-width: 920px) 22vw, 260px"
                        onPlay={(origin) => open(items, position, origin)}
                      >
                        <span className="tv-ep-num">
                          Eps <b>{String(position + 1).padStart(2, "0")}</b>
                        </span>
                        <span className="tv-ep-title">{episode.title}</span>
                      </Poster>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>

        <div className="tv-credits-roll">
          <span className="tv-credit-label">Diproduksi oleh</span>
          <strong className="tv-credit-name">Lembu Lemu · Balerejo</strong>
          <span className="tv-credit-label">Ikuti kelanjutannya di</span>
          <div className="tv-social">
            <a className="tv-social-ig" href={site.instagram} target="_blank" rel="noopener noreferrer">
              <span className="tv-social-icon">
                <InstagramIcon size={22} />
              </span>
              <span>
                <small>Instagram</small>
                <Handle value={site.instagramHandle} />
              </span>
            </a>
            <a className="tv-social-tt" href={site.tiktok} target="_blank" rel="noopener noreferrer">
              <span className="tv-social-icon">
                <TikTokIcon size={22} />
              </span>
              <span>
                <small>TikTok</small>
                <Handle value={site.tiktokHandle} />
              </span>
            </a>
            <a className="tv-social-fb" href={site.facebook} target="_blank" rel="noopener noreferrer">
              <span className="tv-social-icon">
                <FacebookIcon size={22} />
              </span>
              <span>
                <small>Facebook</small>
                <Handle value={site.facebookHandle} />
              </span>
            </a>
          </div>
        </div>
      </div>

      {session ? (
        <TvPlayer
          items={session.items}
          startIndex={session.index}
          origin={session.origin}
          onClose={() => setSession(null)}
        />
      ) : null}
    </section>
  );
}
