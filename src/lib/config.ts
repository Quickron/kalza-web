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
  tenantPortalUrl:
    process.env.NEXT_PUBLIC_TENANT_PORTAL_URL ??
    (env === "production" ? "https://panel.kalza.cl" : "http://localhost:3001"),
  supportEmail: "soporte.kalza@gmail.com",
};
