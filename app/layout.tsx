import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { CSPostHogProvider } from './providers'

export const metadata = {
  title: 'Newspodify',
  description: 'Your News, Your Way',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <CSPostHogProvider>
      <body className={inter.className}>
        
        {children}
        </body>
      </CSPostHogProvider>
    </html>
  )
}
