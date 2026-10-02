import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PricingTable } from "@/components/sections/PricingTable";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return { title: t("title") };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!siteConfig.showPricing) notFound();
  setRequestLocale(locale);
  return <PricingTable />;
}
