import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "./lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lembu Lemu",
    short_name: "Lembu Lemu",
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7efe2",
    theme_color: "#8f171b",
    lang: "id-ID",
    icons: [
      {
        src: absoluteUrl(site.logo),
        sizes: "500x500",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: absoluteUrl(site.logo),
        sizes: "500x500",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
  };
}
