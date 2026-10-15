import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AUROZEN AI",
    short_name: "AUROZEN",
    description: "AI consulting, automation, and intelligent systems for business growth.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f8",
    theme_color: "#0c0c14",
    icons: [{ src: "/logo-mark.png", sizes: "256x256", type: "image/png" }],
  };
}
