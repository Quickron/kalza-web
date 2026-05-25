"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { submitDemo, type ActionResult } from "@/lib/actions";
import { ServiceErrorToast } from "@/components/ui/ServiceErrorToast";

const initial: ActionResult | null = null;

export function DemoForm() {
  const t = useTranslations("demo");
  const [state, action, pending] = useActionState(submitDemo, initial);

  if (state?.ok) {
    return (
      <div className="rounded-3xl border border-[var(--primary)]/40 bg-[var(--card)] p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--primary)]" />
        <h3 className="mt-4 text-xl font-semibold">{t("successTitle")}</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">{t("successBody")}</p>
      </div>
    );
  }

  const errors = (!state?.ok && state?.fieldErrors) || {};

  return (
    <>
      {state && !state.ok && state.message && (
        <ServiceErrorToast message={state.message} />
      )}
      <form
        action={action}
        className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput
            name="company"
            label={t("company")}
            error={errors.company}
            required
            autoComplete="organization"
          />
          <TextInput
            name="email"
            type="email"
            label={t("email")}
            error={errors.email}
            required
            autoComplete="email"
          />
          <Select
            name="catalogSize"
            label={t("catalogSize")}
            required
            options={[
              { value: "small", label: t("catalogSmall") },
              { value: "medium", label: t("catalogMedium") },
              { value: "large", label: t("catalogLarge") },
            ]}
            error={errors.catalogSize}
          />
          <Select
            name="platform"
            label={t("platform")}
            required
            options={[
              { value: "shopify", label: t("platformShopify") },
              { value: "woocommerce", label: t("platformWoo") },
              { value: "other", label: t("platformOther") },
            ]}
            error={errors.platform}
          />
          <TextInput
            name="preferredTime"
            label={t("preferredTime")}
            error={errors.preferredTime}
            placeholder="Lun – Vie, 10:00 – 18:00"
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="f-notes"
            className="block text-xs font-medium uppercase tracking-wider text-[var(--subtle)]"
          >
            {t("notes")}
          </label>
          <textarea
            id="f-notes"
            name="notes"
            rows={4}
            className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 text-sm outline-none focus-visible:border-[var(--primary)]"
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 text-sm font-semibold text-[var(--primary-fg)] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {pending ? (
              t("submitting")
            ) : (
              <>
                <Send className="h-4 w-4" /> {t("submit")}
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

function TextInput({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  placeholder,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium uppercase tracking-wider text-[var(--subtle)]"
      >
        {label}
        {required && <span aria-hidden className="ml-0.5 text-[var(--primary)]">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={!!error}
        className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 text-sm outline-none focus-visible:border-[var(--primary)]"
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-600 dark:text-red-300">{error}</p>
      )}
    </div>
  );
}

function Select({
  name,
  label,
  options,
  required,
  error,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}) {
  const id = `f-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium uppercase tracking-wider text-[var(--subtle)]"
      >
        {label}
        {required && <span aria-hidden className="ml-0.5 text-[var(--primary)]">*</span>}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        aria-invalid={!!error}
        className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 text-sm outline-none focus-visible:border-[var(--primary)]"
      >
        <option value="" disabled>
          —
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1.5 text-xs text-red-600 dark:text-red-300">{error}</p>
      )}
    </div>
  );
}
