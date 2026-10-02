const env = process.env.NEXT_PUBLIC_APP_ENV ?? "local";
const apiBaseUrl =
  env === "production"
    ? "https://api.kalza.cl"
    : (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080");

export const siteConfig = {
  env,
  apiBaseUrl,
  legalPrivacyUrl: `${apiBaseUrl}/legal/privacy-policies/current`,
  legalTermsUrl: `${apiBaseUrl}/legal/terms/current`,
  // Production always points to the real tenant dashboard; the env override
  // only applies to non-production builds (e.g. a tunnel or staging URL).
  tenantPortalUrl:
    env === "production"
      ? "https://dashboard.kalza.cl"
      : (process.env.NEXT_PUBLIC_TENANT_PORTAL_URL ?? "http://localhost:3001"),
  supportEmail: "soporte.kalza@gmail.com",
  // Pricing page is hidden until public plans are finalized.
  showPricing: false,
};
