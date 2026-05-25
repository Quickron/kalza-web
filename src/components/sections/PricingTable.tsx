import { useTranslations } from "next-intl";
import { Check, X, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { plans, compareRows, type PlanId } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const planIds: PlanId[] = ["starter", "growth", "enterprise"];

export function PricingTable() {
  const t = useTranslations("pricing");

  return (
    <>
      <Section>
        <Container>
          <SectionHeader
            eyebrow={t("billedMonthly")}
            title={t("title")}
            description={t("subtitle")}
            align="center"
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => {
              const featured = plan.recommended;
              return (
                <div
                  key={plan.id}
                  className={cn(
                    "relative flex flex-col rounded-3xl border p-8",
                    featured
                      ? "border-[var(--primary)] bg-[var(--card)] shadow-xl shadow-[var(--primary)]/10"
                      : "border-[var(--border)] bg-[var(--card)]",
                  )}
                >
                  {featured && (
                    <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-[var(--primary-fg)]">
                      <Sparkles className="h-3 w-3" /> {t("recommended")}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold">
                    {t(`${plan.id}Name`)}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {t(`${plan.id}Tagline`)}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-mono text-5xl font-semibold tracking-tight">
                      {t(`${plan.id}Price`)}
                    </span>
                    {plan.id !== "enterprise" && (
                      <span className="text-sm text-[var(--muted)]">
                        {t("perMonth")}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-wider text-[var(--subtle)]">
                    {t("tryOnsPerMonth")}
                  </p>
                  <p className="font-mono text-lg font-semibold">
                    {plan.tryOnsPerMonth}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                        <span className="text-[var(--fg)]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <LinkButton
                      href={plan.ctaHref}
                      size="lg"
                      variant={featured ? "primary" : "outline"}
                      className="w-full"
                    >
                      {t(plan.ctaKey)}
                    </LinkButton>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--card)] border-y border-[var(--border)]">
        <Container>
          <SectionHeader title={t("compareTitle")} align="center" />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-[var(--bg)] text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--subtle)]">
                    {t("feature")}
                  </th>
                  {planIds.map((id) => (
                    <th
                      key={id}
                      className="px-5 py-4 text-center text-sm font-semibold"
                    >
                      {t(`${id}Name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-t border-[var(--border)]",
                      i % 2 === 1 && "bg-[var(--bg)]/30",
                    )}
                  >
                    <td className="px-5 py-4 text-[var(--muted)]">
                      {row.feature}
                    </td>
                    {planIds.map((id) => {
                      const v = row.values[id];
                      return (
                        <td
                          key={id}
                          className="px-5 py-4 text-center font-mono text-sm"
                        >
                          {typeof v === "boolean" ? (
                            v ? (
                              <Check
                                className="mx-auto h-4 w-4 text-[var(--primary)]"
                                aria-label={t("yes")}
                              />
                            ) : (
                              <X
                                className="mx-auto h-4 w-4 text-[var(--subtle)]"
                                aria-label={t("no")}
                              />
                            )
                          ) : (
                            v
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl">
          <SectionHeader title={t("faqTitle")} align="center" />
          <dl className="mt-10 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <details
                key={i}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 open:bg-[var(--bg)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold">
                  {t(`faq${i}Q`)}
                  <span
                    aria-hidden
                    className="ml-4 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] text-lg group-open:rotate-45 transition-transform"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  {t(`faq${i}A`)}
                </p>
              </details>
            ))}
          </dl>
        </Container>
      </Section>
    </>
  );
}
