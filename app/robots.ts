import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "./lib/site";

const allowedBots = [
  "*",
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Applebot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowedBots.map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
