import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseConfig } from "./config";
export async function serverClient() {
  const config = supabaseConfig();
  if (!config) return null;
  const store = await cookies();
  return createServerClient(config.url, config.key, {
    db: { retry: false },
    cookies: {
      getAll: () => store.getAll(),
      setAll: (values) => {
        // Server Components cannot mutate cookies; proxy.ts performs session refresh.
        try {
          values.forEach(({ name, value, options }) =>
            store.set(name, value, options),
          );
        } catch {
          /* Read-only render context. */
        }
      },
    },
    global: {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          cache: "no-store",
          signal: AbortSignal.timeout(8000),
        }),
    },
  });
}
