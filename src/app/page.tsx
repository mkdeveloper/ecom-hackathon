import { Products, Promotion, Hero, Unique, Newsletter } from "@/components/sections";

export default function Home() {
  return (
    <main>
      <Hero />
      <Promotion />
      <Products />
      <Unique />
      <Newsletter />
    </main>
  );
}
