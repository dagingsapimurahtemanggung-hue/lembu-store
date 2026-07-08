import type { MetadataRoute } from "next";
import { absoluteUrl, productPath, products, servicePath, services, site } from "./lib/site";

const lastModified = "2026-07-07";

export default function sitemap(): MetadataRoute.Sitemap {
  const homepage: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/"),
    lastModified,
    changeFrequency: "weekly",
    priority: 1,
    images: [
      absoluteUrl(site.ogImage),
      absoluteUrl("/daging.png"),
      absoluteUrl("/kualtitas.jpg"),
      absoluteUrl("/pemotongan.jpg"),
      absoluteUrl("/kemasan.jpg"),
    ],
  };

  const productPages = products.map((product) => ({
    url: absoluteUrl(productPath(product)),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.82,
    images: [absoluteUrl(product.img)],
  }));

  const servicePages = services.map((service) => ({
    url: absoluteUrl(servicePath(service)),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  return [homepage, ...productPages, ...servicePages];
}
