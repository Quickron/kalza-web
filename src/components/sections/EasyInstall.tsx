import { useTranslations } from "next-intl";
import Image from "next/image";
import { MousePointerClick } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";

type Platform = {
  name: string;
  logo: string;
  /** Variant for dark theme when the default logo would be unreadable. */
  logoOnDark?: string;
  width: number;
  height: number;
  /** Icon-only logos need the platform name next to them. */
  showName?: boolean;
  available: boolean;
};

const platforms: Platform[] = [
  {
    name: "Shopify",
    logo: "/images/platforms/shopify.svg",
    width: 32,
    height: 32,
    showName: true,
    available: true,
  },
  {
    name: "Wix",
    logo: "/images/platforms/wix.svg",
    logoOnDark: "/images/platforms/wix-on-dark.svg",
    width: 56,
    height: 32,
    available: true,
  },
  {
    name: "Jumpseller",
    logo: "/images/platforms/jumpseller.svg",
    logoOnDark: "/images/platforms/jumpseller-on-dark.svg",
    width: 150,
    height: 28,
    available: false,
  },
];

function PlatformLogo({ platform }: { platform: Platform }) {
  const size = { width: platform.width, height: platform.height };

  if (!platform.logoOnDark) {
    return <Image src={platform.logo} alt={platform.name} {...size} />;
  }

  return (
    <>
      <Image src={platform.logo} alt={platform.name} {...size} className="dark:hidden" />
      <Image
        src={platform.logoOnDark}
        alt={platform.name}
        {...size}
        className="hidden dark:block"
      />
    </>
  );
}

export function EasyInstall() {
  const t = useTranslations("home");
  const common = useTranslations("common");

  return (
    <Section className="py-14 sm:py-14 lg:py-14">
      <Container>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center sm:p-12">
          <MousePointerClick className="mx-auto h-8 w-8 text-[var(--primary)]" />
          <div className="mt-4">
            <Eyebrow>{t("installEyebrow")}</Eyebrow>
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("installTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
            {t("installBody")}
          </p>
          <ul className="mt-8 flex flex-wrap items-stretch justify-center gap-4">
            {platforms.map((platform) => (
              <li
                key={platform.name}
                className="relative flex h-24 w-52 items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-6"
              >
                <PlatformLogo platform={platform} />
                {platform.showName && (
                  <span className="text-lg font-semibold">{platform.name}</span>
                )}
                {!platform.available && (
                  <span className="absolute -top-2.5 right-3 rounded-full bg-[var(--primary)] px-2 py-0.5 text-xs font-medium text-white">
                    {common("comingSoon")}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
