import Footer from "@/components/Footer";
import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import ClientLayout from './ClientLayout';
import './globals.css';
import { PHProvider } from './providers';

const PostHogPageView = dynamic(() => import('./PostHogPageView') as Promise<typeof import('./PostHogPageView')>, {
  ssr: false,
  loading: () => null,
});

export const metadata: Metadata = {
  title: "Newspodify",
  description: "Newsletters Transformed into Engaging Podcasts",
  openGraph: {
    title: 'Newspodify',
    description: 'Newsletters Transformed into Engaging Podcasts',
    images: [
      {
        url: '/noads.webp', // Update this to the actual path of your featured image
        width: 600,
        height: 600,
        alt: 'Newspodify featured image',
      },
    ],
  },
 
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          <ClientLayout>
            <PostHogPageView />
            <main className="relative overflow-hidden">
              {children}
            </main>
            <Footer />
          </ClientLayout>
        </body>
      </PHProvider>
    </html>
  )
}
