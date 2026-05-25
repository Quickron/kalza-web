import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoMark({
  className,
  size = 60,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      aria-label="Kalza"
      role="img"
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/logo/logo_claro_sin_fondo.png"
        alt=""
        width={size}
        height={size}
        className="block h-full w-full object-contain dark:hidden"
        priority
      />
      <Image
        src="/images/logo/logo_oscuro_sin_fondo.png"
        alt=""
        width={size}
        height={size}
        className="hidden h-full w-full object-contain dark:block"
        priority
      />
    </span>
  );
}

export function Logo({
  className,
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[var(--fg)]",
        className,
      )}
    >
      <LogoMark size={50} />
      {withWordmark && (
        <span className="text-xl font-semibold tracking-tight">KALZA</span>
      )}
    </span>
  );
}
