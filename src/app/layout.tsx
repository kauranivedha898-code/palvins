import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Palvins - Health Cakes & Conscious Eating',
  description: 'Premium health cakes and conscious eating products in Nigeria',
  keywords: 'health cakes, healthy snacks, conscious eating, Nigeria',
  authors: [{ name: 'Palvins' }],
  openGraph: {
    title: 'Palvins - Health Cakes & Conscious Eating',
    description: 'Premium health cakes and conscious eating products',
    url: 'https://palvins.com',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='28' font-size='28'>🌿</text></svg>" />
      </head>
      <body className="bg-cream text-cocoa">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
