<<<<<<< HEAD
/** @type {import('next').NextConfig} */
const nextConfig = {};
=======
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
>>>>>>> 68701eb29d54020edcf3928d54200aa5a1f2bf91

export default nextConfig;
