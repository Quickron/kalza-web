"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        pathname,
        { locale: nextLocale as (typeof routing.locales)[number] },
      );
    });
  }

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{t("switchLanguage")}</span>
      <Languages
        className="pointer-events-none absolute left-3 h-4 w-4 text-[var(--muted)]"
        aria-hidden
      />
      <select
        value={locale}
        onChange={(e) => onChange(e.target.value)}
        disabled={isPending}
        className="h-11 rounded-full border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-sm font-medium text-[var(--fg)] outline-none transition-colors hover:bg-[var(--bg)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
