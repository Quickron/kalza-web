import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contact");

  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeader title={t("title")} description={t("subtitle")} />
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-start gap-3 text-[var(--muted)]">
                <Mail className="mt-0.5 h-4 w-4 text-[var(--primary)]" />
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="font-mono text-[var(--fg)] hover:text-[var(--primary)]"
                >
                  {siteConfig.supportEmail}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[var(--muted)]">
                <MapPin className="mt-0.5 h-4 w-4 text-[var(--primary)]" />
                Santiago, Chile
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
