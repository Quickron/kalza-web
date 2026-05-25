import { useTranslations } from "next-intl";
import { Ruler, PackageX, Frown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";

export function ShopperProblem() {
  const t = useTranslations("home");

  const pains = [
    {
      icon: Ruler,
      title: t("shopperPain1Title"),
      body: t("shopperPain1Body"),
    },
    {
      icon: PackageX,
      title: t("shopperPain2Title"),
      body: t("shopperPain2Body"),
    },
    {
      icon: Frown,
      title: t("shopperPain3Title"),
      body: t("shopperPain3Body"),
    },
  ];

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={t("shopperProblemEyebrow")}
          title={t("shopperProblemTitle")}
          description={t("shopperProblemBody")}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pains.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--primary)]/40"
            >
              <Icon
                className="h-6 w-6 text-[var(--primary)]"
                aria-hidden
              />
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{body}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
