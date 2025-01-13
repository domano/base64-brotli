import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Base64 + Brotli Decoder',
  description: 'Decode base64-encoded brotli-compressed data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script type="module" src="https://unpkg.com/prettier@3.4.2/standalone.mjs"></script>
        <script type="module" src="https://unpkg.com/prettier@3.4.2/plugins/graphql.mjs"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
