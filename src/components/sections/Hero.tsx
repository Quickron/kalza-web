import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, Ruler, Sparkles, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

export function Hero() {
  const t = useTranslations("home");
  const common = useTranslations("common");

  return (
    <section className="relative overflow-hidden">
      <div className="bg-mesh absolute inset-0 -z-10" aria-hidden />
      <div className="grid-bg absolute inset-0 -z-10 opacity-60" aria-hidden />
      <Container className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="mt-5 whitespace-pre-line text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base text-[var(--muted)] sm:text-lg">
              {t("heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/demo" size="lg" variant="primary">
                {common("ctaDemo")} <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton
                href={siteConfig.tenantPortalUrl}
                external
                size="lg"
                variant="outline"
              >
                {common("ctaPortal")}
              </LinkButton>
            </div>
            {/* <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--border)] pt-6">
              <Stat value="-32%" label={t("heroStatReturns")} />
              <Stat value="+18%" label={t("heroStatConversion")} />
              <Stat value="94%" label={t("heroStatAccuracy")} />
            </dl> */}
          </div>

          <WidgetMock />
        </div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl">
        {value}
      </dt>
      <dd className="mt-1 text-xs text-[var(--muted)] sm:text-sm">{label}</dd>
    </div>
  );
}

export function WidgetMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-[var(--accent)]/15 blur-2xl" />
      <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-2xl shadow-black/10">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted)]">
            <Ruler className="h-3.5 w-3.5 text-[var(--primary)]" />
            Kalza · Try-On Widget
          </div>
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-[var(--border)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--border)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--border)] to-[var(--card)]">
            <Image
              src="/images/mujer-ejemplo.png"
              alt="Persona para prueba virtual"
              fill
              sizes="(min-width: 1024px) 150px, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/45 to-transparent p-3 text-xs font-medium text-white">
              Persona
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--border)] to-[var(--card)]">
            <Image
              src="/images/vestido_morado.png"
              alt="Vestido morado"
              fill
              sizes="(min-width: 1024px) 150px, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/45 to-transparent p-3 text-xs font-medium text-white">
              Producto
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--primary)]/40 bg-gradient-to-br from-[var(--primary)]/10 to-transparent">
            <Image
              src="/images/mujer-prueba.jpg"
              alt="Resultado de try-on con IA"
              fill
              sizes="(min-width: 1024px) 150px, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/55 to-transparent p-3 text-xs font-medium text-white">
              <Sparkles className="mr-1 h-3 w-3" /> Prueba Virtual
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--muted)]">Talla recomendada</p>
              <p className="mt-0.5 text-3xl font-semibold tracking-tight">M</p>
            </div>
            <div className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-[var(--primary-fg)]">
              94% match
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
