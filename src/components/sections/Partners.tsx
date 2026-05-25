import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";

const partners = [
  { name: "Mosali Boutique", logo: "/images/stores/mosali_logo.png" },
];

export function Partners() {
  const t = useTranslations("home");

  return (
    <Section className="border-y border-[var(--border)] bg-[var(--card)] py-14">
      <Container>
        <div className="text-center">
          <Eyebrow>{t("partnersEyebrow")}</Eyebrow>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("partnersTitle")}
          </h2>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex h-24 w-56 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-8 py-6"
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={170}
                height={74}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
