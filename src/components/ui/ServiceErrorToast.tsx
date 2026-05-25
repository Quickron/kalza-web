import { AlertCircle } from "lucide-react";

export function ServiceErrorToast({ message }: { message: string }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed right-4 top-20 z-[80] flex w-[min(22rem,calc(100vw-2rem))] items-start gap-3 rounded-2xl border border-red-300/60 bg-white p-4 text-sm text-red-900 shadow-2xl shadow-black/15 dark:border-red-500/40 dark:bg-[#1b1113] dark:text-red-100"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-300" />
      <div>
        <p className="font-semibold">Servicio no disponible</p>
        <p className="mt-0.5 text-red-800 dark:text-red-100">{message}</p>
      </div>
    </div>
  );
}
