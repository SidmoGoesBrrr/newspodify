// components/AuthHandler.tsx
'use client'
import { FC, useEffect, useState } from 'react';
import { useSession, useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';

interface AuthHandlerProps {
  onUserLoaded: (user: any) => void;
}

const AuthHandler: FC<AuthHandlerProps> = ({ onUserLoaded }) => {
  const [hasCheckedUser, setHasCheckedUser] = useState(false);
  const { user } = useUser();
  const { session } = useSession();

  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: 'supabase',
            });

            const headers = new Headers(options?.headers);
            headers.set('Authorization', `Bearer ${clerkToken}`);

            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      }
    );
  }

  const client = createClerkSupabaseClient();

  useEffect(() => {
    if (!user) return;

    async function checkAndInsertUser(user: any) {
      const userId = user.id;
      const email = user.primaryEmailAddress?.emailAddress;

      if (!userId || !email) {
        console.error('User ID or email is missing');
        return;
      }

      const res = await fetch('/api/check-and-insert-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email,
        }),
      });

      if (!res.ok) {
        console.error('Error checking and inserting user');
      }
    }

    async function loadNewsletters(user: any) {
      const { data, error } = await client
        .from('customers')
        .select('newsletters')
        .eq('user_id', user.id)
        .single();

      if (!error && data) {
        onUserLoaded(data);
      } else if (error) {
        console.error('Error loading newsletters:', error.message);
      }
    }

    const sessionStorageKey = `user-checked-${user.id}`;
    const hasCheckedUserInSession = sessionStorage.getItem(sessionStorageKey);

    if (!hasCheckedUserInSession) {
      checkAndInsertUser(user).finally(() => {
        setHasCheckedUser(true);
        sessionStorage.setItem(sessionStorageKey, 'true');
      });
    } else {
      setHasCheckedUser(true);
    }

    if (hasCheckedUser) {
      loadNewsletters(user);
    }
  }, [user, hasCheckedUser, onUserLoaded, client]);

  return null;
};

export default AuthHandler;
