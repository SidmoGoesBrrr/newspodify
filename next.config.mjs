import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables from .env.local
config({ path: join(process.cwd(), '.env.local') });

/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        apiKey: process.env.API_KEY,
    },
    publicRuntimeConfig: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
    },
};

export default nextConfig;
