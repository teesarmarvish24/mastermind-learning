import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-navy-100 bg-white/95 backdrop-blur sticky top-0 z-50 transition-shadow">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/contact"
            className="focus-ring link-fade hidden sm:inline-block rounded-md px-3 py-2 text-sm font-medium text-navy-600 hover:text-navy-950 transition-colors"
          >
            Contact
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="focus-ring link-fade rounded-md px-3 py-2 text-sm font-medium text-navy-600 hover:text-navy-950 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/modules"
                className="focus-ring link-fade rounded-md px-3 py-2 text-sm font-medium text-navy-600 hover:text-navy-950 transition-colors"
              >
                Modules
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="focus-ring link-fade rounded-md px-3 py-2 text-sm font-medium text-navy-600 hover:text-navy-950 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="focus-ring btn-press rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors"
                style={{
                  background: "linear-gradient(135deg, #1E3F66, #040A14)",
                  boxShadow: "0 4px 14px -4px rgba(30,63,102,0.6)",
                }}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
