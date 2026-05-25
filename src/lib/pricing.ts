// PROPUESTA — ajustar con cifras finales del negocio
export type PlanId = "starter" | "growth" | "enterprise";

export type Plan = {
  id: PlanId;
  recommended?: boolean;
  tryOnsPerMonth: string;
  features: string[];
  ctaHref: string;
  ctaKey: "selectPlan" | "contactSales";
};

export const plans: Plan[] = [
  {
    id: "starter",
    tryOnsPerMonth: "500",
    features: [
      "Widget embebible",
      "Recomendación de talla IA",
      "1 tienda conectada",
      "Soporte por email",
    ],
    ctaHref: "/demo",
    ctaKey: "selectPlan",
  },
  {
    id: "growth",
    recommended: true,
    tryOnsPerMonth: "3.000",
    features: [
      "Todo lo de Starter",
      "Prueba virtual con IA",
      "3 tiendas conectadas",
      "Analytics avanzado",
      "Soporte prioritario",
    ],
    ctaHref: "/demo",
    ctaKey: "selectPlan",
  },
  {
    id: "enterprise",
    tryOnsPerMonth: "Ilimitado",
    features: [
      "Todo lo de Growth",
      "SLA 99,9% uptime",
      "Integración custom (Shopify / WooCommerce / headless)",
      "SSO y controles avanzados",
      "Account manager dedicado",
      "Onboarding white-glove",
    ],
    ctaHref: "/contacto",
    ctaKey: "contactSales",
  },
];

export type CompareRow = {
  feature: string;
  values: Record<PlanId, string | boolean>;
};

export const compareRows: CompareRow[] = [
  {
    feature: "Generaciones de prueba virtual / mes",
    values: { starter: "500", growth: "3.000", enterprise: "Ilimitado" },
  },
  {
    feature: "Recomendación de talla IA",
    values: { starter: true, growth: true, enterprise: true },
  },
  {
    feature: "Prueba virtual con IA",
    values: { starter: false, growth: true, enterprise: true },
  },
  {
    feature: "Tiendas conectadas",
    values: { starter: "1", growth: "3", enterprise: "A medida" },
  },
  {
    feature: "Analytics y dashboard",
    values: { starter: "Básico", growth: "Avanzado", enterprise: "Custom" },
  },
  {
    feature: "Soporte",
    values: { starter: "Email", growth: "Prioritario", enterprise: "Dedicado" },
  },
  {
    feature: "SLA contractual",
    values: { starter: false, growth: false, enterprise: "99,9%" },
  },
  {
    feature: "SSO",
    values: { starter: false, growth: false, enterprise: true },
  },
  {
    feature: "Integración custom",
    values: { starter: false, growth: false, enterprise: true },
  },
];
