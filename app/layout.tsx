import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Lilou Gille — Portfolio | Marketing Stratégique & Communication',
  description:
    "Portfolio digital de Lilou Gille, étudiante en Droit, Économie et Gestion de la Communication à l'ISTC – Université Catholique de Lille. Marketing stratégique, branding et communication.",
  generator: 'v0.app',
  authors: [{ name: 'Lilou Gille' }],
  keywords: [
    'Lilou Gille',
    'portfolio',
    'marketing stratégique',
    'communication',
    'branding',
    'ISTC',
    'Lille',
  ],
  openGraph: {
    title: 'Lilou Gille — Portfolio',
    description:
      'Observer. Comprendre. Anticiper. Le portfolio digital de Lilou Gille, future professionnelle du marketing stratégique et de la communication.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0a09',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
