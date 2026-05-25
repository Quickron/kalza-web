import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Logo />
          </div>
          <FooterCol title={t("product")}>
            <FooterLink href="/productos">{nav("products")}</FooterLink>
            <FooterLink href="/soluciones">{nav("solutions")}</FooterLink>
            <FooterLink href="/precios">{nav("pricing")}</FooterLink>
          </FooterCol>
          <FooterCol title={t("company")}>
            <FooterLink href="/nosotros">{nav("about")}</FooterLink>
            <FooterLink href="/clientes">{nav("customers")}</FooterLink>
            <FooterLink href="/contacto">{nav("contact")}</FooterLink>
          </FooterCol>
          <FooterCol title={t("legal")}>
            <FooterLink href={siteConfig.legalPrivacyUrl} external>
              {t("privacy")}
            </FooterLink>
            <FooterLink href={siteConfig.legalTermsUrl} external>
              {t("terms")}
            </FooterLink>
          </FooterCol>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--subtle)] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Kalza. {t("rights")}</p>
          <p className="font-mono text-xs">soporte.kalza@gmail.com</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--subtle)]">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
        >
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
      >
        {children}
      </Link>
    </li>
  );
}
