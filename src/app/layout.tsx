import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fillout',
  description: 'Fillout nav component',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full text-text font-inter font-medium tracking-tight">{children}</body>
    </html>
  )
}
