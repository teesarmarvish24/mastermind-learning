import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  const hasLogo = fs.existsSync(logoPath);

  const dims = { sm: 32, md: 44, lg: 64 }[size];
  const textSize = { sm: "text-base", md: "text-xl", lg: "text-3xl" }[size];

  return (
    <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-md link-fade">
      {hasLogo ? (
        <Image
          src="/logo.png"
          alt="Mastermind Learning logo"
          width={dims}
          height={dims}
          className="object-contain"
          priority
        />
      ) : (
        <div
          style={{
            width: dims,
            height: dims,
            background: "linear-gradient(135deg, #1E3F66, #040A14)",
            boxShadow: "0 4px 14px -4px rgba(30,63,102,0.55)",
          }}
          className="rounded-[10px] flex items-center justify-center text-white font-display font-bold"
        >
          ML
        </div>
      )}
      <span className={`font-display font-semibold text-navy-950 ${textSize} leading-none`}>
        Mastermind Learning
      </span>
    </Link>
  );
}
