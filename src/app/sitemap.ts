import type { MetadataRoute } from "next";

// Static export requires the metadata route to be declared static.
export const dynamic = "force-static";

const baseUrl = "https://fluorineos.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/docs/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/changelog/`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}
