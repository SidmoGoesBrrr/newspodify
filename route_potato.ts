import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { getDecryptedData } from './utils/decrypt';
import encryptedData from './data/encrypted_data.json'; // Adjust the path as needed

const decryptedData = getDecryptedData(encryptedData);

const supabase = createClient(decryptedData.supabase_url, decryptedData.supabase_key);
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
console.log(decryptedData)
const sendEmail = async (email: string) => {
  const response = await axios.post(
    'https://api.resend.com/emails',
    {
      from: 'Siddhant Mohile <siddhant@zodevelopers.com>',
      to: [email],
      subject: 'Welcome to Newspodify!',
      html: `
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <header style="text-align: center; padding: 20px 0;">
          <h1 style="color: #4CAF50;">Newspodify</h1>
        </header>
        <main style="padding: 20px;">
          <p>Hey,</p>
          <p>I'm Siddhant, one of the creators of Newspodify. Thank you so much for expressing your interest in our app—it means a lot to have your support at this stage.</p>
          <p>You'll be among the first to receive access to Newspodify when we launch. We're still ironing out a few bugs and adding some exciting features, and your feedback could be invaluable to us. I'd love to hear your thoughts and use your insights to make Newspodify even better.</p>
          <p>Could you take a moment to fill out this <a href="[Google Form URL]" style="color: #4CAF50; text-decoration: none;">Google Form</a>? Alternatively, you can reply to this email with your answers to these questions:</p>
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
      </body>
      `,
    },
    {
      headers: {
        Authorization: `Bearer ${decryptedData.resend_key}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      return;
    }
  
    const apiKey = req.headers['x-api-key'];
  
    if (!apiKey || apiKey !== API_KEY) {
      res.status(403).json({ error: 'Forbidden: Invalid API key' });
      return;
    }
  
    const { email } = req.body;
  
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }
  
    try {
      await supabase.from('users').insert([{ email }]);
      await sendEmail(email);
      res.status(200).json({ message: 'Email received. It has been saved to Supabase. A confirmation email has been sent.', email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save email or send confirmation' });
    }
  }