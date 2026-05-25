import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/config";

export const metadata = { title: "Privacidad" };

export default function PrivacyPage() {
  redirect(siteConfig.legalPrivacyUrl);
}
