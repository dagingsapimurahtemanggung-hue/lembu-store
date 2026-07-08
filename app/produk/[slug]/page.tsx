import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MessageCircle, ShieldCheck, ShoppingCart } from "lucide-react";
import { DetailHeader } from "../../components/detail-header";
import { JsonLd } from "../../components/json-ld";
import {
  absoluteUrl,
  faqs,
  formatRupiah,
  productPath,
  products,
  services,
  site,
  siteUrl,
} from "../../lib/site";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  const title = `${product.name} Segar Temanggung`;
  const description = `${product.summary} Harga awal ${formatRupiah(product.price)}/kg. Pesan ${product.name.toLowerCase()} halal dari Lembu Lemu Tlogomulyo via WhatsApp.`;

  return {
    title,
    description,
    alternates: {
      canonical: productPath(product),
    },
    keywords: [
      product.name,
      `${product.name} Temanggung`,
      `${product.name} Tlogomulyo`,
      `${product.name} halal`,
      `${product.name} segar`,
      ...product.uses.map((use) => `${product.name} untuk ${use}`),
    ],
    openGraph: {
      title,
      description,
      url: productPath(product),
      type: "website",
      images: [
        {
          url: product.img,
          alt: product.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(product.img)],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${siteUrl}${productPath(product)}#product`,
        name: product.name,
        image: absoluteUrl(product.img),
        description: product.summary,
        category: product.category,
        brand: {
          "@type": "Brand",
          name: site.name,
        },
        offers: {
          "@type": "Offer",
          url: absoluteUrl(productPath(product)),
          priceCurrency: "IDR",
          price: product.price,
          availability: "https://schema.org/InStock",
          seller: {
            "@id": `${siteUrl}/#localbusiness`,
          },
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}${productPath(product)}#webpage`,
        url: absoluteUrl(productPath(product)),
        name: `${product.name} Segar Temanggung`,
        description: product.summary,
        inLanguage: "id-ID",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        mainEntity: {
          "@id": `${siteUrl}${productPath(product)}#product`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.slice(0, 3).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
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
            name: "Produk",
            item: absoluteUrl("/#produk"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: absoluteUrl(productPath(product)),
          },
        ],
      },
    ],
  };

  const waText = encodeURIComponent(
    `Halo Lembu Lemu, saya ingin tanya stok ${product.name}. Berat yang dibutuhkan:`,
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <DetailHeader />
      <main className="detail-page">
        <section className="detail-hero">
          <div className="detail-copy">
            <span className="eyebrow">Produk {product.category}</span>
            <h1>{product.name}</h1>
            <p>{product.summary}</p>
            <div className="detail-price">
              <span>Harga awal</span>
              <strong>{formatRupiah(product.price)}/kg</strong>
            </div>
            <div className="detail-actions">
              <a
                className="primary-action"
                href={`https://wa.me/${site.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                Tanya stok
              </a>
              <Link className="secondary-detail-action" href="/#produk">
                <ShoppingCart size={18} />
                Kembali ke katalog
              </Link>
            </div>
          </div>
          <div className="detail-image">
            <Image src={product.img} alt={product.alt} fill priority sizes="(max-width: 768px) 92vw, 44vw" />
          </div>
        </section>

        <section className="detail-content">
          <article>
            <span className="eyebrow">Rekomendasi pemakaian</span>
            <h2>Cocok untuk menu yang butuh potongan tepat.</h2>
            <p>
              {product.name} sering dipilih untuk {product.uses.join(", ")}. Pesanan
              dapat disiapkan dalam pilihan berat {product.weights.join(", ")} dengan
              konfirmasi stok harian dari tim Lembu Lemu.
            </p>
            <ul>
              <li>
                <ShieldCheck size={18} />
                Pemotongan halal dan bersih untuk kebutuhan rumah maupun bisnis.
              </li>
              <li>
                <ShieldCheck size={18} />
                Bisa dikombinasikan dengan layanan {services[0].name.toLowerCase()}.
              </li>
              <li>
                <ShieldCheck size={18} />
                Cocok untuk pelanggan Temanggung, Tlogomulyo, dan area sekitar.
              </li>
            </ul>
          </article>

          <aside>
            <h2>Pilihan berat</h2>
            <div className="detail-weight-list">
              {product.weights.map((weight) => (
                <span key={weight}>
                  {weight}
                  <strong>{formatRupiah(product.price * (Number.parseFloat(weight) || 1))}</strong>
                </span>
              ))}
            </div>
          </aside>
        </section>

        {relatedProducts.length ? (
          <section className="related-section">
            <span className="eyebrow">Produk terkait</span>
            <h2>Masih satu kategori.</h2>
            <div className="related-grid">
              {relatedProducts.map((item) => (
                <Link href={productPath(item)} key={item.id}>
                  <Image src={item.img} alt={item.alt} width={96} height={96} />
                  <span>
                    <strong>{item.name}</strong>
                    {formatRupiah(item.price)}/kg
                  </span>
                  <ChevronRight size={18} />
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
