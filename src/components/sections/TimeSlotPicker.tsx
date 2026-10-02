"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import {
  DEMO_SLOT_MINUTES,
  DEMO_SLOT_TIMES,
  DEMO_TIME_ZONE,
  getUpcomingDemoDays,
  type DemoDay,
} from "@/lib/demo-availability";

const slotId = (dayKey: string, time: string) => `${dayKey}|${time}`;

export function TimeSlotPicker({
  name,
  label,
  error,
}: {
  name: string;
  label: string;
  error?: string;
}) {
  const t = useTranslations("demo");
  const locale = useLocale();
  // Dates depend on the visitor's clock, so they are computed after mount.
  const [days, setDays] = useState<DemoDay[]>([]);
  const [activeKey, setActiveKey] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const upcoming = getUpcomingDemoDays();
    setDays(upcoming);
    setActiveKey(upcoming[0]?.key ?? "");
  }, []);

  const dayLabel = useMemo(() => {
    const short = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    return (day: DemoDay) => short.format(day.date).replace(".", "");
  }, [locale]);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  const countForDay = (dayKey: string) =>
    selected.filter((id) => id.startsWith(`${dayKey}|`)).length;

  const serialized = days
    .map((day) => {
      const times = DEMO_SLOT_TIMES.filter((time) =>
        selected.includes(slotId(day.key, time)),
      );
      return times.length ? `${dayLabel(day)}: ${times.join(", ")}` : null;
    })
    .filter(Boolean)
    .join("; ");

  const selectedChips = days.flatMap((day) =>
    DEMO_SLOT_TIMES.filter((time) => selected.includes(slotId(day.key, time))).map(
      (time) => ({ id: slotId(day.key, time), text: `${dayLabel(day)} · ${time}` }),
    ),
  );

  return (
    <fieldset className="sm:col-span-2" aria-describedby="f-times-help">
      <legend className="block text-xs font-medium uppercase tracking-wider text-[var(--subtle)]">
        {label}
        <span aria-hidden className="ml-0.5 text-[var(--primary)]">*</span>
      </legend>
      <p id="f-times-help" className="mt-1 text-xs text-[var(--muted)]">
        {t("timesHelp", { minutes: DEMO_SLOT_MINUTES, zone: "Chile" })}
      </p>
      <input type="hidden" name={name} value={serialized} />

      <div role="group" aria-label={t("timesDayLabel")} className="mt-3 flex flex-wrap gap-2">
        {days.map((day) => {
          const count = countForDay(day.key);
          const active = day.key === activeKey;
          return (
            <button
              key={day.key}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveKey(day.key)}
              className={`inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl border px-4 text-sm font-medium capitalize transition-colors ${
                active
                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--fg)]"
                  : "border-[var(--border)] bg-[var(--bg)] text-[var(--muted)] hover:border-[var(--primary)]"
              }`}
            >
              {dayLabel(day)}
              {count > 0 && (
                <span className="rounded-full bg-[var(--primary)] px-1.5 text-xs text-[var(--primary-fg)]">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {days.length > 0 &&
          DEMO_SLOT_TIMES.map((time) => {
            const id = slotId(activeKey, time);
            const isSelected = selected.includes(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggle(id)}
                className={`inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-xl border text-sm tabular-nums transition-colors ${
                  isSelected
                    ? "border-[var(--primary)] bg-[var(--primary)] font-semibold text-[var(--primary-fg)]"
                    : "border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]"
                }`}
              >
                {isSelected && <Check className="h-4 w-4" aria-hidden />}
                {time}
              </button>
            );
          })}
      </div>

      <div aria-live="polite" className="mt-3 min-h-6">
        {selectedChips.length === 0 ? (
          <p className="text-xs text-[var(--subtle)]">{t("timesNone")}</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {selectedChips.map((chip) => (
              <li
                key={chip.id}
                className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg)] py-1 pl-3 pr-1 text-xs capitalize"
              >
                {chip.text}
                <button
                  type="button"
                  onClick={() => toggle(chip.id)}
                  aria-label={t("timesRemove", { slot: chip.text })}
                  className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-[var(--border)]"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-300">
          {t("timesRequired")}
        </p>
      )}
    </fieldset>
  );
}
