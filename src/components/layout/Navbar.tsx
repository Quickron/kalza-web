"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const links = [
    { href: "/productos", label: t("products") },
    { href: "/soluciones", label: t("solutions") },
    { href: "/clientes", label: t("customers") },
    // { href: "/precios", label: t("pricing") },
    { href: "/nosotros", label: t("about") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_85%,transparent)] backdrop-blur-lg">
      <div className="grid h-16 w-full grid-cols-[1fr_auto] items-center gap-4 px-5 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link
          href="/"
          aria-label="Kalza"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <div className="hidden items-center justify-center gap-6 lg:flex lg:gap-8 xl:gap-14">
          <nav className="flex items-center gap-2" aria-label="Primary">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-[var(--fg)]"
                      : "text-[var(--muted)] hover:text-[var(--fg)]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LinkButton
              href={siteConfig.tenantPortalUrl}
              external
              variant="outline"
              size="sm"
            >
              {tCommon("ctaPortal")}
            </LinkButton>
            <LinkButton href="/demo" variant="primary" size="sm">
              {tCommon("ctaDemo")}
            </LinkButton>
          </div>
        </div>

        <div className="hidden items-center justify-end gap-2 lg:flex">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("menu")}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[var(--border)] bg-[var(--bg)] lg:hidden"
        >
          <div className="mx-auto w-full max-w-7xl px-5 py-4 sm:px-6">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-[var(--fg)] hover:bg-[var(--card)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-2">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <LinkButton
                href={siteConfig.tenantPortalUrl}
                external
                variant="outline"
                size="md"
                onClick={() => setOpen(false)}
              >
                {tCommon("ctaPortal")}
              </LinkButton>
              <LinkButton
                href="/demo"
                variant="primary"
                size="md"
                onClick={() => setOpen(false)}
              >
                {tCommon("ctaDemo")}
              </LinkButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
