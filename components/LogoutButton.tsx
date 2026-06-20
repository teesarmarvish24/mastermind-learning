"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="focus-ring btn-press rounded-md px-4 py-2 text-sm font-semibold text-navy-950 border-[1.5px] border-navy-200 hover:border-navy-400 transition-colors"
    >
      Log out
    </button>
  );
}
