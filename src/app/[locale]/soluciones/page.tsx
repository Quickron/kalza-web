import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Ruler, Sparkles, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions" });
  return { title: t("title") };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SolutionsContent />;
}

function SolutionsContent() {
  const t = useTranslations("solutions");
  const common = useTranslations("common");

  return (
    <>
      <Section>
        <Container>
          <SectionHeader
            eyebrow={common("brand")}
            title={t("title")}
            description={t("subtitle")}
          />
        </Container>
      </Section>

      <Section className="border-y border-[var(--border)] bg-[var(--card)]">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <Ruler className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-tight">
                {t("sizeTitle")}
              </h3>
              <p className="mt-4 text-base text-[var(--muted)]">{t("sizeBody")}</p>
              <ol className="mt-6 space-y-3 text-sm">
                <Step n={1} text={t("sizeStep1")} />
                <Step n={2} text={t("sizeStep2")} />
                <Step n={3} text={t("sizeStep3")} />
              </ol>
            </div>
            <FlowDiagram
              labels={["Medidas", "Tabla + IA", "Talla + Match"]}
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <BeforeAfter />
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-tight">
                {t("tryOnTitle")}
              </h3>
              <p className="mt-4 text-base text-[var(--muted)]">{t("tryOnBody")}</p>
              <ol className="mt-6 space-y-3 text-sm">
                <Step n={1} text={t("tryOnStep1")} />
                <Step n={2} text={t("tryOnStep2")} />
                <Step n={3} text={t("tryOnStep3")} />
              </ol>
              <div className="mt-8">
                <LinkButton href="/demo" variant="primary">
                  {common("ctaDemo")} <ArrowRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-16 max-w-2xl text-center font-mono text-xs text-[var(--subtle)]">
            {t("techNote")}
          </p>
        </Container>
      </Section>
    </>
  );
}

function Step({ n, text }: { n: number; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 font-mono text-xs font-semibold text-[var(--primary)]">
        {n}
      </span>
      <span className="text-[var(--fg)]">{text}</span>
    </li>
  );
}

function FlowDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {labels.map((l, i) => (
          <div key={l} className="flex flex-1 items-center gap-4">
            <div className="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--subtle)]">
                Step {i + 1}
              </p>
              <p className="mt-2 text-sm font-semibold">{l}</p>
            </div>
            {i < labels.length - 1 && (
              <ArrowRight
                className="hidden h-4 w-4 shrink-0 text-[var(--primary)] sm:block"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BeforeAfter() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--border)] to-[var(--card)]">
        <Image
          src="/images/mujer-ejemplo.png"
          alt="Foto del cliente"
          fill
          sizes="(min-width: 1024px) 180px, 33vw"
          className="object-cover"
        />
        <p className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--subtle)] backdrop-blur dark:bg-black/45 dark:text-white/80">
          Foto del cliente
        </p>
      </div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--border)] to-[var(--card)]">
        <Image
          src="/images/vestido_morado.png"
          alt="Prenda seleccionada"
          fill
          sizes="(min-width: 1024px) 180px, 33vw"
          className="object-cover"
        />
        <p className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--subtle)] backdrop-blur dark:bg-black/45 dark:text-white/80">
          Prenda
        </p>
      </div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-[var(--primary)]/40 bg-gradient-to-br from-[var(--primary)]/20 via-[var(--accent)]/10 to-transparent">
        <Image
          src="/images/mujer-prueba.jpg"
          alt="Resultado de try-on con IA"
          fill
          sizes="(min-width: 1024px) 180px, 33vw"
          className="object-cover"
        />
        <p className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--primary)] backdrop-blur dark:bg-black/50">
          <Sparkles className="mr-1 h-3 w-3" aria-hidden />
          Prueba Virtual
        </p>
      </div>
    </div>
  );
}
