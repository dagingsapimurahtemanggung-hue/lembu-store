"use client";

import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { useState } from "react";
import {
  mediaVideos,
  site,
  youtubeShortUrl,
  youtubeThumbnail,
  type MediaVideo,
} from "../lib/site";

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

function videoLabel(video: MediaVideo) {
  return video.part ? `${video.title} part ${video.part}` : video.title;
}

/** Thumbnail Shorts 9:16 yang berubah jadi pemutar YouTube saat diklik. */
function ShortPlayer({ video, priority = false }: { video: MediaVideo; priority?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const label = videoLabel(video);

  if (playing) {
    return (
      <iframe
        className="short-frame"
        title={label}
        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      className="short-thumb"
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Putar video ${label}`}
    >
      <Image
        src={youtubeThumbnail(video.id)}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 620px) 46vw, (max-width: 920px) 24vw, 300px"
      />
      <span className="short-play" aria-hidden="true">
        <Play size={22} fill="currentColor" />
      </span>
    </button>
  );
}

function SeriesTile({ video }: { video: MediaVideo }) {
  return (
    <article className="media-tile media-short">
      <ShortPlayer video={video} />
      <div className="media-short-meta" aria-hidden="true">
        <span className="media-chip">{video.series ?? "Video"}</span>
        {video.part ? (
          <strong className="media-part">
            Part <span>{String(video.part).padStart(2, "0")}</span>
          </strong>
        ) : null}
      </div>
      <h3 className="sr-only">{videoLabel(video)}</h3>
    </article>
  );
}

export function MediaSection() {
  const [profile, ...series] = mediaVideos;

  return (
    <section className="gallery-section media-section" id="galeri">
      <div className="section-head split">
        <div>
          <span className="eyebrow">Informasi &amp; media sosial</span>
          <h2>Informasi dan media sosial kami.</h2>
        </div>
        <p>
          Tonton profil dan cerita di balik Lembu Lemu, lalu ikuti akun resmi kami untuk
          update stok, harga, dan kegiatan harian.
        </p>
      </div>

      <div className="media-bento">
        <article className="media-tile media-profile">
          <div className="media-profile-video">
            <ShortPlayer video={profile} priority />
          </div>
          <div className="media-profile-copy">
            <span className="media-chip">Video profil</span>
            <h3>{profile.title}</h3>
            <p>{profile.description}</p>
            <a
              className="media-link"
              href={youtubeShortUrl(profile.id)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tonton di YouTube
              <ArrowUpRight size={16} />
            </a>
          </div>
        </article>

        {series.map((video) => (
          <SeriesTile video={video} key={video.id} />
        ))}

        <a
          className="media-tile media-social media-instagram"
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon size={40} />
          <span className="media-social-label">Instagram</span>
          <Handle value={site.instagramHandle} />
          <span className="media-social-body">Foto produk, info stok, dan kabar terbaru.</span>
          <span className="media-social-cta">
            Buka Instagram
            <ArrowUpRight size={16} />
          </span>
        </a>

        <a
          className="media-tile media-social media-tiktok"
          href={site.tiktok}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TikTokIcon size={40} />
          <span className="media-social-label">TikTok</span>
          <Handle value={site.tiktokHandle} />
          <span className="media-social-body">Video singkat proses dan keseharian kami.</span>
          <span className="media-social-cta">
            Buka TikTok
            <ArrowUpRight size={16} />
          </span>
        </a>
      </div>
    </section>
  );
}
