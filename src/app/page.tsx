import HeroBanner from "@/components/herobanner";
import Image from "next/image";
import FeatureCard from "@/components/featurecard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeroBanner />
      <FeatureCard />
    </main>
  );
}
