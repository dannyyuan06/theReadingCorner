import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from './navigationBar/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TRC',
  description: 'The Reading Corner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation/>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
