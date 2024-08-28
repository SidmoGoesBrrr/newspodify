import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getAuth } from '@clerk/nextjs/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
  try {
    // Get user ID from Clerk
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: 'User ID missing' }, { status: 400 });
    }

    // Fetch newsletters from the Supabase database
    const { data, error } = await supabase
      .from('customers')
      .select('newsletters')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching newsletters:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data.length === 0) {
      return NextResponse.json({ newsletters: [] }, { status: 200 });
    }

    const userNewsletters = data[0].newsletters || [];
    return NextResponse.json({ newsletters: userNewsletters }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}
