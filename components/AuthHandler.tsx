// components/AuthHandler.tsx
'use client';
import { FC, useEffect, useState } from 'react';
import { useSession, useUser } from '@clerk/nextjs';
import { createClerkSupabaseClient } from '@/utils/supabaseClient';

interface AuthHandlerProps {
  onUserLoaded: (user: any) => void;
}

const AuthHandler: FC<AuthHandlerProps> = ({ onUserLoaded }) => {
  const [client, setClient] = useState<any>(null);
  const { user } = useUser();
  const { session } = useSession();

  useEffect(() => {
    // Create the Supabase client only once when the session token is available
    if (session && !client) {
      session.getToken({ template: 'supabase' }).then((token) => {
        if (token) {
          const newClient = createClerkSupabaseClient(token);
          setClient(newClient);
        }
      });
    }
  }, [session, client]);

  useEffect(() => {
    if (!user || !client) return;

    const sessionStorageKey = `user-checked-${user.id}`;
    const hasCheckedUserInSession = sessionStorage.getItem(sessionStorageKey);

    // Function to check and insert the user if necessary
    const checkAndInsertUser = async () => {
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
        body: JSON.stringify({ userId, email }),
      });

      if (!res.ok) {
        console.error('Error checking and inserting user');
      }
    };

    // Function to load newsletters
    const loadNewsletters = async () => {
      const { data, error } = await client
        .from('customers')
        .select('newsletters')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error loading newsletters:', error.message);
      } else if (data) {
        onUserLoaded(data);
      }
    };

    // Perform the user check if not already done in this session
    if (!hasCheckedUserInSession) {
      checkAndInsertUser().finally(() => {
        sessionStorage.setItem(sessionStorageKey, 'true');
        loadNewsletters(); // Load newsletters after user is checked/inserted
      });
    } else {
      loadNewsletters(); // Load newsletters directly if user has been checked before
    }
  }, [user, client, onUserLoaded]);

  return null;
};

export default AuthHandler;
