import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from './navigationBar/Navigation'
import styles from './layout.module.css'
import { ReduxProvider } from '@/redux/Provider'

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
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/gzh2kwv.css"/>
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <Navigation/>
          <div className={styles.bodyContainer}>
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}
