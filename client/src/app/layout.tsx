import "./globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "./navigationBar/Navigation";
import styles from "./layout.module.css";
import { ReduxProvider } from "@/redux/Provider";
import { SessionProviders } from "./components/SessionProviders";

// For google fonts.
const inter = Inter({ subsets: ["latin"] });

// Page metadata which could be used for web crawlers like google
export const metadata = {
  title: "TRC",
  description: "The Reading Corner",
};

// Where the web app root function starts.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/gzh2kwv.css" />
      </head>
      <body className={inter.className}>
        {/* For authentication */}
        <SessionProviders>
          {/* For storing local data */}
          <ReduxProvider>
            <Navigation />
            <div className={styles.bodyWrapper}>
              <div className={styles.bodyContainer}>
                {/* Where the pages will be */}
                {children}
              </div>
            </div>
          </ReduxProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
