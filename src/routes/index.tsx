import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IP-SAKTI Sahayak — Evidence-Grounded Ayurveda IP Intelligence" },
      { name: "description", content: "Multilingual, source-cited AI guidance for Ayurveda intellectual property, prior-art discovery, and regulatory compliance." },
      { property: "og:title", content: "IP-SAKTI Sahayak — Ayurveda IP Intelligence" },
      { property: "og:description", content: "Evidence-grounded AI for Ayurveda's IP and regulatory ecosystem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});