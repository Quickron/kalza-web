import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/config";

export const metadata = { title: "Términos" };

export default function TermsPage() {
  redirect(siteConfig.legalTermsUrl);
}
