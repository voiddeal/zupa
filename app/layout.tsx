import type { Metadata } from "next"
import { Barrio } from "next/font/google"
import AppProviders from "@/providers/AppProviders"
import "./globals.css"

const barrio = Barrio({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "Zupa",
  description: "Tile Match Puzzle",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${barrio.className} overflow-x-hidden`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
