import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Target, ShieldCheck, Leaf } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { team } from "@/lib/team";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");

  const values = [
    { icon: Target, title: t("value1Title"), body: t("value1Body") },
    { icon: ShieldCheck, title: t("value2Title"), body: t("value2Body") },
    { icon: Leaf, title: t("value3Title"), body: t("value3Body") },
  ];

  return (
    <>
      <Section>
        <Container>
          <SectionHeader title={t("title")} description={t("subtitle")} />
        </Container>
      </Section>

      <Section className="border-y border-[var(--border)] bg-[var(--card)]">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("storyTitle")}
          </h2>
          <p className="mt-5 text-base text-[var(--muted)]">{t("storyP1")}</p>
          <p className="mt-4 text-base text-[var(--muted)]">{t("storyP2")}</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader title={t("valuesTitle")} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
              >
                <Icon className="h-6 w-6 text-[var(--primary)]" aria-hidden />
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--border)] bg-[var(--card)]">
        <Container>
          <SectionHeader title={t("teamTitle")} description={t("teamBody")} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <article
                key={m.role}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-center"
              >
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] font-bold text-white">
                  {m.initials}
                </span>
                <p className="mt-4 text-base font-semibold">{m.name}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{m.role}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
