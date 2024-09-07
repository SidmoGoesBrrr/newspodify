// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export const createClerkSupabaseClient = (sessionToken: string) => {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      fetch: async (url, options = {}) => {
        const headers = new Headers(options?.headers);
        headers.set('Authorization', `Bearer ${sessionToken}`);

        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
  });
};
