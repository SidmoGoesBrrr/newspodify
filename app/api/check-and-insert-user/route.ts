import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { clerkClient, getAuth } from '@clerk/nextjs/server';

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    // Retrieve user ID from Clerk authentication
    const { userId } = getAuth(req);

    if (!userId) {
      console.error('User ID missing from authentication');
      return NextResponse.json({ error: 'User ID missing' }, { status: 400 });
    }

    // Fetch user from Clerk
    const user = await clerkClient.users.getUser(userId);

    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      console.error('Email address missing for user:', userId);
      return NextResponse.json({ error: 'Email address missing' }, { status: 400 });
    }

    const emailAddress = user.emailAddresses[0].emailAddress;

    // Check if user already exists in Supabase
    const { data, error } = await supabase
      .from('customers')
      .select()
      .eq('user_id', String(userId).trim())
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase error while checking user:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      // Insert new user into Supabase
      const { error: insertError } = await supabase
        .from('customers')
        .insert({
          user_id: userId,
          email_address: emailAddress,
          newsletters: [],
        });

      if (insertError) {
        console.error('Supabase insert error:', insertError.message);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ message: 'User checked and inserted if necessary' }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error in check-and-insert-user:', error);
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}
