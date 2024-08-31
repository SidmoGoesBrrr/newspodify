// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Footer from "@/components/Footer";
import dynamic from 'next/dynamic';
import { ReactNode } from 'react'
import { PHProvider } from './providers';
import ClientLayout from './ClientLayout';

const PostHogPageView = dynamic(() => import('./PostHogPageView') as Promise<typeof import('./PostHogPageView')>, {
  ssr: false,
  loading: () => null,
});

export const metadata = {
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
          <ClerkProvider>
            <ClientLayout>
              <div className="relative flex flex-col min-h-screen">
                <PostHogPageView />
                <main className="flex-1 bg-black-3">
                  <section>
                    <div>
                      <div>
                        {children}
                        {/*TOASTER*/}
                      </div>
                    </div>
                  </section>
                  {/*RIGHTSIDEBAR*/} 
                </main>
                <Footer />
              </div>
            </ClientLayout>
          </ClerkProvider>
        </body>
      </PHProvider>
    </html>
  );
}
