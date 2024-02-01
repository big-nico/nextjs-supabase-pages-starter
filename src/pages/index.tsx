import { useRouter } from "next/router";
import { useState } from "react";

import { createClient } from "@/utils/supabase/component";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  }

  return (
    <main>
      <form>
        <button type="button" onClick={signInWithGoogle}>
          Log in with Google
        </button>
      </form>
    </main>
  );
}
