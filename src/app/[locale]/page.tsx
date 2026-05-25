import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { RetailProblem } from "@/components/sections/RetailProblem";
import { ShopperProblem } from "@/components/sections/ShopperProblem";
import { Partners } from "@/components/sections/Partners";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <RetailProblem />
      <ShopperProblem />
      <Partners />
      <FinalCTA />
    </>
  );
}
