import { useTranslations } from "next-intl";
import { TrendingDown, Truck, Leaf, PackageX } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";

export function RetailProblem() {
  const t = useTranslations("home");

  const stats = [
    { value: t("retailStat1"), label: t("retailStat1Label"), icon: TrendingDown },
    { value: t("retailStat2"), label: t("retailStat2Label"), icon: Truck },
      { value: t("retailStat3"), label: t("retailStat3Label"), icon: Leaf },
      { value: t("retailStat4"), label: t("retailStat4Label"), icon: PackageX },
  ];

  return (
    <Section className="border-t border-[var(--border)] bg-[var(--card)]">
      <Container>
        <SectionHeader
          eyebrow={t("retailProblemEyebrow")}
          title={t("retailProblemTitle")}
          description={t("retailProblemBody")}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-4 font-mono text-3xl font-semibold tracking-tight sm:text-4xl">
                {value}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
