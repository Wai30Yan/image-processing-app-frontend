import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Image Processing App',
  description: 'Frontend written in NextJS, the backend in Spring Boot using Google Cloud Vision API to process image.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
