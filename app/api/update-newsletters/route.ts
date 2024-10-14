import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getAuth } from '@clerk/nextjs/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    // Get user ID from Clerk
    const { userId } = getAuth(req);
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID missing' }, { status: 400 });
    }

    // Parse JSON body
    const { newsletters } = await req.json();
    
    // Ensure newsletters is provided and is an array
    if (!Array.isArray(newsletters)) {
      return NextResponse.json({ error: 'Invalid newsletters format' }, { status: 400 });
    }

    // Update newsletters in the database
    const { error: updateError } = await supabase
      .from('customers')
      .update({ newsletters })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error updating newsletters:', updateError.message);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Newsletters updated successfully', newsletters }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}
