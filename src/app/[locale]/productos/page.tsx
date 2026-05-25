import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Boxes } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { WidgetMock } from "@/components/sections/Hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return { title: t("title") };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductsContent />;
}

function ProductsContent() {
  const t = useTranslations("products");
  const common = useTranslations("common");

  const features = [
    t("kalzaFeature1"),
    t("kalzaFeature2"),
    // t("kalzaFeature3"),
    t("kalzaFeature4"),
  ];

  return (
    <>
      <Section>
        <Container>
          <SectionHeader
            eyebrow={common("brand")}
            title={t("title")}
            description={t("subtitle")}
          />
          <div className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-12">
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <Eyebrow>{t("kalzaTag")}</Eyebrow>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {t("kalzaName")}
                </h3>
                <p className="mt-4 text-base text-[var(--muted)]">
                  {t("kalzaDescription")}
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <LinkButton href="/soluciones" variant="primary">
                    {t("kalzaCta")} <ArrowRight className="h-4 w-4" />
                  </LinkButton>
                  <LinkButton href="/demo" variant="outline">
                    {common("ctaDemo")}
                  </LinkButton>
                </div>
              </div>
              <div className="lg:pt-2">
                <WidgetMock />
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--bg)] p-8 text-center">
            <Boxes className="mx-auto h-8 w-8 text-[var(--primary)]" />
            <h4 className="mt-3 text-lg font-semibold">{t("futureTitle")}</h4>
            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted)]">
              {t("futureBody")}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

function CodeMock() {
  return (
    <div className="surface-dark overflow-hidden rounded-2xl border border-white/10 bg-obsidian font-mono text-xs">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/30 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-[10px] text-white/50">product-page.html</span>
      </div>
      <pre className="overflow-x-auto p-5 text-white/80">
        <code>{`<!-- Integra Kalza en una línea -->
<script
  src="https://cdn.kalza.cl/widget.js"
  data-tenant="your-store"
  data-product="SKU-1234"
  defer
></script>

<div id="kalza-widget"></div>`}</code>
      </pre>
    </div>
  );
}
