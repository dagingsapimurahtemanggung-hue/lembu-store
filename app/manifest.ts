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
        src: absoluteUrl("/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: absoluteUrl("/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
