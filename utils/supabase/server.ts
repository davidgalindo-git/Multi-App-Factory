import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers';
import { Database } from '@/types/db';

type CookieToSet = {
  name: string;
  value: string;
  options: any;
};

export function createClient() {
  const cookieStore = cookies()

  // Explicit generics keep Supabase's `SupabaseClient` type aligned across this repo.
  return createServerClient<Database, 'public', 'public'>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (error) {
            console.error('Error setting cookies:', error);
          }
        },
      },
    }
  )
}
