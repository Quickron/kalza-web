import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { DemoForm } from "@/components/sections/DemoForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "demo" });
  return { title: t("title") };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DemoContent />;
}

function DemoContent() {
  const t = useTranslations("demo");

  const perks = [
    "Demo en vivo sobre un producto de tu catálogo",
    "Análisis del impacto potencial en tus devoluciones",
    "Plan de integración estimado",
  ];

  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeader title={t("title")} description={t("subtitle")} />
            <ul className="mt-8 space-y-3 text-sm">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                  <span className="text-[var(--muted)]">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <DemoForm />
        </div>
      </Container>
    </Section>
  );
}
