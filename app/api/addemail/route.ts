import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const resendApiKey = process.env.RESEND_KEY || '';

async function sendEmail(email: string) {
    try {
        const response = await axios.post(
            'https://api.resend.com/emails',
            {
                from: "Siddhant Mohile <siddhant@zodevelopers.com>", // Replace with your sender email
                to: [email],
                subject: "Welcome to Newspodify!",
                html: `

            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <header style="text-align: center; padding: 20px 0;">
                    <h1 style="color: #4CAF50;">Newspodify</h1>
                </header>
                <main style="padding: 20px;">
                    <p>Hey,</p>
                    <p>I'm Siddhant, one of the creators of Newspodify. Thank you so much for expressing your interest in our app—it means a lot to have your support at this stage.</p>
                    <p>You'll be among the first to receive access to Newspodify when we launch. We're still ironing out a few bugs and adding some exciting features, and your feedback could be invaluable to us. I'd love to hear your thoughts and use your insights to make Newspodify even better.</p>
                    <p>Could you take a moment to fill out this <a href="https://newspodify.app/suggestions/" style="color: #4CAF50; text-decoration: none;">Google Form</a>? Alternatively, you can reply to this email with your answers to these questions:</p>
                    <ul>
                        <li>What features of Newspodify are you most excited about?</li>
                        <li>Which newsletters would you like us to add?</li>
                        <li>How much would you be willing to pay to use this product?</li>
                    </ul>
                    <p>Please let me know if there's anything else you'd like us to consider. You don’t have to answer all these questions, but even a quick response would help us improve your experience.</p>
                    <p>And hey, reply to this email with your name so I can get to know you better!</p>
                    <p>Thanks again for your support. It means the world to us.</p>
                    <p>Best,<br>Siddhant</p>
                </main>
                <footer style="text-align: center; padding: 20px 0; font-size: 0.8em; color: #777;">
                    <p>&copy; 2024 Newspodify. All rights reserved.</p>
                </footer>
            </body>`

            ,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resendApiKey}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Failed to send email');
    }
}

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

        
        await sendEmail(email)
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
