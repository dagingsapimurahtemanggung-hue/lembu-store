import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { DetailHeader } from "../../components/detail-header";
import { JsonLd } from "../../components/json-ld";
import {
  absoluteUrl,
  areaPath,
  areaSlug,
  formatRupiah,
  productPath,
  products,
  serviceAreas,
  services,
  site,
  siteUrl,
} from "../../lib/site";

type AreaPageProps = {
  params: Promise<{ slug: string }>;
};

function getArea(slug: string) {
  return serviceAreas.find((area) => areaSlug(area) === slug);
}

export function generateStaticParams() {
  return serviceAreas.map((area) => ({
    slug: areaSlug(area),
  }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);

  if (!area) {
    return {};
  }

  const title = `Daging Sapi Segar ${area} Temanggung`;
  const description = `Pesan daging sapi segar halal untuk area ${area} dan sekitar Temanggung dari Lembu Lemu. Pilih potongan, cek harga awal, lalu konfirmasi stok via WhatsApp.`;

  return {
    title,
    description,
    alternates: {
      canonical: areaPath(area),
    },
    keywords: [
      `daging sapi ${area}`,
      `jual daging sapi ${area}`,
      `daging sapi segar ${area}`,
      `supplier daging sapi ${area}`,
      `daging halal ${area}`,
      `pesan daging sapi ${area}`,
      `harga daging sapi ${area}`,
      `jagal sapi ${area}`,
      `kurban sapi ${area}`,
      `daging katering ${area}`,
      `daging warung makan ${area}`,
      ...products.slice(0, 12).map((product) => `${product.name} ${area}`),
    ],
    openGraph: {
      title,
      description,
      url: areaPath(area),
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

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = getArea(slug);

  if (!area) {
    notFound();
  }

  const featuredProducts = products.filter((product) => product.available !== false).slice(0, 6);
  const featuredServices = services.slice(0, 4);
  const waText = encodeURIComponent(
    `Halo Lembu Lemu, saya ingin tanya stok daging sapi untuk area ${area}.`,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}${areaPath(area)}#webpage`,
        url: absoluteUrl(areaPath(area)),
        name: `Daging Sapi Segar ${area} Temanggung`,
        description: `Informasi pemesanan daging sapi segar halal Lembu Lemu untuk area ${area}.`,
        inLanguage: "id-ID",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#localbusiness`,
        },
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}${areaPath(area)}#service`,
        name: `Pesan daging sapi area ${area}`,
        description: `Konfirmasi stok daging sapi, tulang, jeroan, potong custom, katering, dan kurban sapi untuk area ${area}.`,
        provider: {
          "@id": `${siteUrl}/#localbusiness`,
        },
        areaServed: area,
        serviceType: "Supplier daging sapi segar halal",
        offers: products.filter((product) => product.available !== false).slice(0, 10).map((product) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: product.name,
            image: absoluteUrl(product.img),
            description: product.summary,
          },
          priceCurrency: "IDR",
          price: product.price,
          url: absoluteUrl(productPath(product)),
        })),
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
            name: "Area",
            item: absoluteUrl("/#kontak"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: area,
            item: absoluteUrl(areaPath(area)),
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <DetailHeader />
      <main className="detail-page">
        <section className="detail-hero service-detail-hero">
          <div className="detail-copy">
            <span className="eyebrow">Area layanan</span>
            <h1>Daging sapi segar untuk {area}.</h1>
            <p>
              Lembu Lemu melayani konfirmasi stok daging sapi halal untuk {area}
              dan sekitar Temanggung. Pilih daging, tulang, jeroan, potong custom,
              atau kebutuhan katering, lalu cek ketersediaan langsung lewat WhatsApp.
            </p>
            <div className="detail-price">
              <span>Harga awal katalog</span>
              <strong>{formatRupiah(30000)} - {formatRupiah(150000)}</strong>
            </div>
            <div className="detail-actions">
              <a
                className="primary-action"
                href={`https://wa.me/${site.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                Tanya stok {area}
              </a>
              <Link className="secondary-detail-action" href="/#produk">
                Lihat katalog
              </Link>
            </div>
          </div>
          <div className="service-panel">
            {featuredServices.map((service) => (
              <span key={service.id}>
                <ShieldCheck size={18} />
                {service.name}
              </span>
            ))}
            <span>
              <MapPin size={18} />
              {area}
            </span>
          </div>
        </section>

        <section className="detail-content">
          <article>
            <span className="eyebrow">Cakupan kebutuhan</span>
            <h2>Untuk rumah tangga, warung, restoran, dan acara.</h2>
            <p>
              Pelanggan di {area} bisa menanyakan daging super, daging no 2,
              daging no 3, tetelan, balung, buntut, urat, babat, paru, lidah,
              gajih, dan bagian sapi lain. Jadwal kirim dan stok mengikuti
              pemotongan harian serta jumlah pesanan.
            </p>
            <ul>
              <li>
                <ShieldCheck size={18} />
                Cocok untuk rendang, rawon, soto, sop iga, sop buntut, dan bakso urat.
              </li>
              <li>
                <ShieldCheck size={18} />
                Bisa tanya potong dadu, slice, fillet, boneless, tulang, dan jeroan.
              </li>
              <li>
                <ShieldCheck size={18} />
                Konfirmasi stok, berat aktual, dan pengiriman dilakukan lewat WhatsApp.
              </li>
            </ul>
          </article>

          <aside>
            <h2>Produk populer untuk {area}</h2>
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
