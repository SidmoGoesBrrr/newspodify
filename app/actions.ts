'use server';

import axios from 'axios';
import { PostHog } from 'posthog-node'

const client = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
  {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
  }
)
const DISCORD_WEBHOOK_URL = process.env.WEBHOOK_DISC||"";

export async function sendFeedback(formData: FormData) {

  const name = formData.get('name') as string;
  const features = formData.get('features') as string;
  const newsletters = formData.get('newsletters') as string;
  const price = formData.get('price') as string;
  const other = formData.get('other') as string;

  if (!name || !features || !newsletters || !price) {
    throw new Error('All fields are required.');
  }
  client.capture({
    distinctId: name,
    event: 'suggestion_added',
});
  await axios.post(DISCORD_WEBHOOK_URL, {
    content: `**Name:** ${name}\n**Features:** ${features}\n**Newsletters:** ${newsletters}\n**Price:** ${price} \n**Other:** ${other}`,
  });

  
}
