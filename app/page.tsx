import { JsonLd } from "./components/json-ld";
import { LembuHome } from "./components/lembu-home";
import {
  absoluteUrl,
  faqs,
  formatRupiah,
  products,
  seoKeywords,
  serviceAreas,
  services,
  site,
  siteUrl,
} from "./lib/site";

const productListSchema = {
  "@type": "ItemList",
  name: "Katalog daging sapi Lembu Lemu",
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
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
        priceCurrency: "IDR",
        price: product.price,
        availability:
          product.available === false
            ? "https://schema.org/OutOfStock"
            : "https://schema.org/InStock",
        url: absoluteUrl(`/produk/${product.slug}`),
      },
    },
  })),
};

const serviceListSchema = {
  "@type": "ItemList",
  name: "Layanan Lembu Lemu",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.name,
      description: service.body,
      provider: {
        "@id": `${siteUrl}/#localbusiness`,
      },
      areaServed: serviceAreas,
      url: absoluteUrl(`/layanan/${service.slug}`),
    },
  })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "FoodEstablishment"],
      "@id": `${siteUrl}/#localbusiness`,
      name: site.name,
      legalName: site.legalName,
      description: site.description,
      url: siteUrl,
      image: absoluteUrl(site.ogImage),
      logo: absoluteUrl(site.logo),
      telephone: site.phone,
      email: site.email,
      priceRange: `${formatRupiah(30000)} - ${formatRupiah(150000)} per kg`,
      knowsAbout: seoKeywords.slice(0, 140),
      address: {
        "@type": "PostalAddress",
        streetAddress: "Desa Balerejo RT 1 RW 1",
        addressLocality: "Tlogomulyo",
        addressRegion: "Jawa Tengah",
        postalCode: "50274",
        addressCountry: "ID",
      },
      areaServed: serviceAreas,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "04:00",
          closes: "11:00",
        },
      ],
      sameAs: [site.instagram, `https://wa.me/${site.whatsapp}`],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Katalog daging sapi Lembu Lemu",
        itemListElement: products.map((product) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: product.name,
            description: product.summary,
            image: absoluteUrl(product.img),
          },
          priceCurrency: "IDR",
          price: product.price,
          availability:
            product.available === false
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
          url: absoluteUrl(`/produk/${product.slug}`),
        })),
      },
      makesOffer: products.filter((product) => product.available !== false).map((product) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: product.name,
          description: product.summary,
        },
        priceCurrency: "IDR",
        price: product.price,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      description: site.description,
      inLanguage: "id-ID",
      publisher: {
        "@id": `${siteUrl}/#localbusiness`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Daging Sapi Segar Halal Temanggung",
      description: site.description,
      keywords: seoKeywords.slice(0, 220).join(", "),
      inLanguage: "id-ID",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#localbusiness`,
      },
      mainEntity: productListSchema,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".hero-copy p", ".faq-list summary"],
      },
      datePublished: "2026-07-06",
      dateModified: "2026-07-16",
    },
    productListSchema,
    serviceListSchema,
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
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
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <LembuHome />
    </>
  );
}
