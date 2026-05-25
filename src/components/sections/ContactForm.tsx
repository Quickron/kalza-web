"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { submitContact, type ActionResult } from "@/lib/actions";
import { ServiceErrorToast } from "@/components/ui/ServiceErrorToast";

const initial: ActionResult | null = null;

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, action, pending] = useActionState(submitContact, initial);

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
          <Field
            name="name"
            label={t("name")}
            error={errors.name}
            required
            autoComplete="name"
          />
          <Field
            name="company"
            label={t("company")}
            error={errors.company}
            required
            autoComplete="organization"
          />
          <Field
            name="email"
            type="email"
            label={t("email")}
            error={errors.email}
            required
            autoComplete="email"
          />
          <Field
            name="phone"
            type="tel"
            label={t("phone")}
            error={errors.phone}
            autoComplete="tel"
          />
        </div>
        <div className="mt-5">
          <FieldArea
            name="message"
            label={t("message")}
            placeholder={t("messagePlaceholder")}
            error={errors.message}
            required
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

function Field({
  name,
  label,
  error,
  type = "text",
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
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
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 text-sm text-[var(--fg)] outline-none transition-colors focus-visible:border-[var(--primary)]"
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-red-600 dark:text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function FieldArea({
  name,
  label,
  error,
  placeholder,
  required,
}: {
  name: string;
  label: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
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
      <textarea
        id={id}
        name={name}
        rows={5}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3 text-sm text-[var(--fg)] outline-none transition-colors focus-visible:border-[var(--primary)]"
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-red-600 dark:text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
