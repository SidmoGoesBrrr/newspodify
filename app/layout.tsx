// app/layout.tsx
import type { Metadata } from "next";
import Footer from "@/components/Footer";

import './globals.css'
import { PHProvider } from './providers'
import dynamic from 'next/dynamic'
import Header from "@/components/Header";

const PostHogPageView = dynamic(() => import('./PostHogPageView') as Promise<typeof import('./PostHogPageView')>, {
  ssr: false,
  loading: () => null, // Provide a loading component if needed
});
export const metadata: Metadata = {
  title: "Newspodify",
  description: "Newsletters Transformed into Engaging Podcasts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          <Header />
          <PostHogPageView />
          <main className="relative overflow-hidden">
            {children}
          </main>
          <Footer />
        </body>
      </PHProvider>
    </html>
  )
}