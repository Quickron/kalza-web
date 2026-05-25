"use server";

import { z } from "zod";
import { siteConfig } from "./config";

const serviceUnavailableMessage =
  "El servicio no se encuentra disponible. Inténtalo más tarde.";

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
});

const demoSchema = z.object({
  company: z.string().min(2),
  email: z.string().email(),
  catalogSize: z.enum(["small", "medium", "large"]),
  platform: z.enum(["shopify", "woocommerce", "vtex", "other"]),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
});

export type ActionResult =
  | { ok: true }
  | { ok: false; fieldErrors?: Record<string, string>; message?: string };

export async function submitContact(
  _: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }
  try {
    const res = await fetch(`${siteConfig.apiBaseUrl}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, source: "kalza-web/contact" }),
    });
    if (!res.ok) {
      return { ok: false, message: serviceUnavailableMessage };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: serviceUnavailableMessage };
  }
}

export async function submitDemo(
  _: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = demoSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }
  try {
    const res = await fetch(`${siteConfig.apiBaseUrl}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, source: "kalza-web/demo" }),
    });
    if (!res.ok) {
      return { ok: false, message: serviceUnavailableMessage };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: serviceUnavailableMessage };
  }
}
