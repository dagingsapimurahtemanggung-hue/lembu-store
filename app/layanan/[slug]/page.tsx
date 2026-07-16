import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MessageCircle, ShieldCheck } from "lucide-react";
import { DetailHeader } from "../../components/detail-header";
import { JsonLd } from "../../components/json-ld";
import {
  absoluteUrl,
  productPath,
  products,
  serviceAreas,
  servicePath,
  services,
  site,
  siteUrl,
} from "../../lib/site";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  const title = `${service.name} Daging Halal Temanggung`;
  const description = `${service.body} Layanan ${service.name.toLowerCase()} dari Lembu Lemu untuk Tlogomulyo, Temanggung, dan area sekitar.`;

  return {
    title,
    description,
    alternates: {
      canonical: servicePath(service),
    },
    keywords: [
      service.name,
      `${service.name} Temanggung`,
      `${service.name} Tlogomulyo`,
      `${service.name} Balerejo`,
      `${service.name} daging halal`,
      `${service.name} daging sapi`,
      `${service.name} via WhatsApp`,
      ...service.highlights,
      ...serviceAreas.slice(0, 12).map((area) => `${service.name} ${area}`),
    ],
    openGraph: {
      title,
      description,
      url: servicePath(service),
      type: "website",
      images: [
        {
          url: absoluteUrl(site.ogImage),
          width: 500,
          height: 500,
          alt: "Lembu Lemu Temanggung",
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(site.ogImage)],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const featuredProducts = products.filter((product) => product.available !== false).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}${servicePath(service)}#service`,
        name: service.name,
        description: service.body,
        provider: {
          "@id": `${siteUrl}/#localbusiness`,
        },
        areaServed: serviceAreas,
        serviceType: service.highlights.join(", "),
        url: absoluteUrl(servicePath(service)),
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}${servicePath(service)}#webpage`,
        url: absoluteUrl(servicePath(service)),
        name: `${service.name} Daging Halal Temanggung`,
        description: service.body,
        inLanguage: "id-ID",
        mainEntity: {
          "@id": `${siteUrl}${servicePath(service)}#service`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beranda",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Layanan",
            item: absoluteUrl("/#layanan"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: absoluteUrl(servicePath(service)),
          },
        ],
      },
    ],
  };

  const waText = encodeURIComponent(`Halo Lembu Lemu, saya ingin tanya ${service.name}.`);

  return (
    <>
      <JsonLd data={jsonLd} />
      <DetailHeader />
      <main className="detail-page">
        <section className="detail-hero service-detail-hero">
          <div className="detail-copy">
            <span className="eyebrow">Layanan Lembu Lemu</span>
            <h1>{service.name}</h1>
            <p>{service.body}</p>
            <div className="detail-actions">
              <a
                className="primary-action"
                href={`https://wa.me/${site.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                Konsultasi WhatsApp
              </a>
              <Link className="secondary-detail-action" href="/#layanan">
                Lihat semua layanan
              </Link>
            </div>
          </div>
          <div className="service-panel">
            {service.highlights.map((highlight) => (
              <span key={highlight}>
                <ShieldCheck size={18} />
                {highlight}
              </span>
            ))}
          </div>
        </section>

        <section className="detail-content">
          <article>
            <span className="eyebrow">Cara kerja</span>
            <h2>Pesanan dibuat sesuai kebutuhan dapur.</h2>
            <p>
              Ceritakan jumlah porsi, jadwal, lokasi kirim, dan bentuk potongan yang
              diinginkan. Tim Lembu Lemu akan mengarahkan pilihan daging, estimasi berat,
              dan stok yang paling cocok untuk {service.name.toLowerCase()}.
            </p>
            <ul>
              <li>
                <ShieldCheck size={18} />
                Cocok untuk pelanggan rumah tangga, acara keluarga, dan bisnis kuliner.
              </li>
              <li>
                <ShieldCheck size={18} />
                Bisa digabung dengan potongan daging sapi, tulang, atau jeroan.
              </li>
              <li>
                <ShieldCheck size={18} />
                Konfirmasi akhir dilakukan lewat WhatsApp agar stok dan jadwal jelas.
              </li>
            </ul>
          </article>

          <aside>
            <h2>Produk yang sering dipasangkan</h2>
            <div className="related-mini-list">
              {featuredProducts.map((product) => (
                <Link href={productPath(product)} key={product.id}>
                  <Image src={product.img} alt={product.alt} width={72} height={72} />
                  <span>
                    <strong>{product.name}</strong>
                    {product.cut}
                  </span>
                  <ChevronRight size={17} />
                </Link>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
