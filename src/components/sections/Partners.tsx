import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { partnerStores, type PartnerStore } from "@/lib/stores";

const cardClassName =
  "flex h-24 w-56 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-8 py-6";

function PartnerLogo({ store }: { store: PartnerStore }) {
  const logo = (
    <Image
      src={store.logo}
      alt={store.name}
      width={170}
      height={74}
      className="max-h-16 w-auto object-contain"
    />
  );

  if (!store.url) return <div className={cardClassName}>{logo}</div>;

  return (
    <a
      href={store.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardClassName} transition-colors hover:border-[var(--primary)]`}
    >
      {logo}
    </a>
  );
}

export function Partners() {
  const t = useTranslations("home");

  return (
    <Section className="border-y border-[var(--border)] bg-[var(--card)] py-14 sm:py-14 lg:py-14">
      <Container>
        <div className="text-center">
          <Eyebrow>{t("partnersEyebrow")}</Eyebrow>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("partnersTitle")}
          </h2>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {partnerStores.map((store) => (
            <PartnerLogo key={store.name} store={store} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
