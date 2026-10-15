import { Btn, Hero } from "@/components/ui";

export default function NotFound() {
  return (
    <Hero title="Page not found" text="That page does not exist or has moved.">
      <Btn href="/">Back to home</Btn>
      <Btn href="/sitemap" ghost>Browse the sitemap</Btn>
    </Hero>
  );
}
