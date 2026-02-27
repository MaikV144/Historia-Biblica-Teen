import type { Metadata, Viewport } from 'next'
import { Nunito, Nunito_Sans, Shadows_Into_Light } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const _nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito-sans" });
const _shadowsIntoLight = Shadows_Into_Light({ weight: "400", subsets: ["latin"], variable: "--font-shadows" });

export const metadata: Metadata = {
  title: 'CardCollect - Tu Coleccion de Cartas',
  description: 'Colecciona, intercambia y completa desafios para desbloquear cartas',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#faf7f5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${_nunito.variable} ${_nunitoSans.variable} ${_shadowsIntoLight.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
