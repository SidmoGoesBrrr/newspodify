'use server';

import axios from 'axios';
import { usePostHog } from 'posthog-js/react';

const DISCORD_WEBHOOK_URL = process.env.WEBHOOK_DISC||"";

export async function sendFeedback(formData: FormData) {
  const posthog = usePostHog();
  const name = formData.get('name') as string;
  const features = formData.get('features') as string;
  const newsletters = formData.get('newsletters') as string;
  const price = formData.get('price') as string;
  const other = formData.get('other') as string;

  if (!name || !features || !newsletters || !price) {
    throw new Error('All fields are required.');
  }
  posthog.capture('feedback_submitted');
  await axios.post(DISCORD_WEBHOOK_URL, {
    content: `**Name:** ${name}\n**Features:** ${features}\n**Newsletters:** ${newsletters}\n**Price:** ${price} \n**Other:** ${other}`,
  });

  
}
