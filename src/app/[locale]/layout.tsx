import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: {
    default: "Kalza · Virtual Try-On & Smart Size Recommendation",
    template: "%s · Kalza",
  },
  description:
    "Kalza ayuda a las marcas de moda a entregar recomendaciones de talla personalizadas y experiencias de prueba virtual que aumentan la conversión y reducen las devoluciones.",
  metadataBase: new URL("https://kalza.cl"),
  openGraph: {
    title: "Kalza · Fit Intelligence para fashion commerce",
    description:
      "Recomendación de talla con IA y prueba virtual realista para e-commerce de moda.",
    type: "website",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
