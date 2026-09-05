import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Book Panditji Seva - Book Puja Services Online',
  description: 'Book authentic Indian traditional puja services, festivals puja, yagnas, homas, and dosha nivaran online. Connect with certified priests for your spiritual needs.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/logo/bookpandit%20log.png', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/logo/bookpandit%20log.png',
    shortcut: '/logo/bookpandit%20log.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
