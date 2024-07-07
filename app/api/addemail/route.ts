import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const email = body.email;

        // Check if the email already exists
        const { data: users, error: selectError } = await supabase
            .from('users')
            .select('email')
            .eq('email', email);

        if (selectError) throw selectError;

        if (users && users.length > 0) {
            // Update last_login for the user
            const { error: updateError } = await supabase
                .from('users')
                .update({ last_login: new Date() })
                .eq('email', email);

            if (updateError) throw updateError;

            return NextResponse.json({ message: 'Email already exists', body });
        }

        // Insert new email if it doesn't exist
        const { data, error: insertError } = await supabase
            .from('users')
            .insert([
                { email: email, email_sent: true }
            ])
            .select();

        if (insertError) throw insertError;

        return NextResponse.json({ message: 'Email sent successfully', body });
    } catch (error) {
        console.error('Failed to send email:', error);
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
