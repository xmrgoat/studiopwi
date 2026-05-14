import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Studio PWI — Sites web pour paysagistes suisses",
    short_name: "Studio PWI",
    description:
      "Studio web spécialisé pour paysagistes suisses. Sites orientés conversion, garantie 90 jours.",
    start_url: "/",
    display: "standalone",
    background_color: "#efefef",
    theme_color: "#396c5e",
    lang: "fr-CH",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
