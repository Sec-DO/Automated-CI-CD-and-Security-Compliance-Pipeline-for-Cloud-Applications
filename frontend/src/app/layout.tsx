import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Foxtrail India',
  description: 'Explore breathtaking treks across India',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en" suppressHydrationWarning={true}>
          <body className={`${inter.className} scroll-smooth`}>{children}</body>
      </html>
  );
}