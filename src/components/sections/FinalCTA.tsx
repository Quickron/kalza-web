import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";

export function FinalCTA() {
  const t = useTranslations("home");
  return (
    <Section>
      <Container>
        <div className="surface-dark relative overflow-hidden rounded-3xl border border-white/10 bg-obsidian p-10 sm:p-14 lg:p-20">
          <div className="bg-mesh absolute inset-0 opacity-80" aria-hidden />
          <div className="relative max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-porcelain sm:text-4xl lg:text-5xl">
              {t("finalCtaTitle")}
            </h2>
            <p className="mt-4 text-pretty text-base text-stone-brand sm:text-lg">
              {t("finalCtaBody")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/demo" size="lg" variant="primary">
                {t("finalCtaPrimary")} <ArrowRight className="h-4 w-4" />
              </LinkButton>
              {/* <LinkButton href="/precios" size="lg" variant="outline">
                {t("finalCtaSecondary")}
              </LinkButton> */}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
