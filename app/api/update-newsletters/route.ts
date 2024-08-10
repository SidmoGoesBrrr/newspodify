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
    const { newsletter, action } = await req.json();
    
    if (!newsletter || !action) {
      return NextResponse.json({ error: 'Newsletter or action missing' }, { status: 400 });
    }

    // Fetch current newsletters
    const { data, error: fetchError } = await supabase
      .from('customers')
      .select('newsletters')
      .eq('user_id', userId)
      .single(); // Ensure only one record is returned

    if (fetchError) {
      console.error('Error fetching user:', fetchError.message);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    let newsletters: string[] = data.newsletters || [];

    if (action === 'add') {
      if (!newsletters.includes(newsletter)) {
        newsletters.push(newsletter);
      } else {
        return NextResponse.json({ message: 'Newsletter already added', newsletters }, { status: 200 });
      }
    } else if (action === 'remove') {
      newsletters = newsletters.filter(n => n !== newsletter);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
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
