import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "customers" });
  return { title: t("title") };
}

export default async function CustomersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CustomersContent />;
}

function CustomersContent() {
  const t = useTranslations("customers");

  return (
    <>
      <Section>
        <Container>
          <SectionHeader title={t("title")} description={t("subtitle")} />
        </Container>
      </Section>

      <Section className="border-y border-[var(--border)] bg-[var(--card)]">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("portalTitle")}
              </h3>
              <p className="mt-3 max-w-xl text-[var(--muted)]">
                {t("portalBody")}
              </p>
            </div>
            <LinkButton
              href={siteConfig.tenantPortalUrl}
              external
              size="lg"
              variant="primary"
            >
              {t("portalCta")} <ExternalLink className="h-4 w-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader title={t("partnersTitle")} description={t("partnersBody")} />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="flex h-32 items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8">
              <Image
                src="/images/stores/mosali_logo.png"
                alt={t("mosaliName")}
                width={190}
                height={83}
                className="max-h-20 w-auto object-contain"
              />
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
