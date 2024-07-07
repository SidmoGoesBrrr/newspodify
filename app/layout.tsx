// app/layout.tsx

import './globals.css'
import { PHProvider } from './providers'
import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          <PostHogPageView /> 
          {children}
        </body>
      </PHProvider>
    </html>
  )
}