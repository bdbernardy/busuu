import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "@/components/header";
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Busuu'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
    lang="en"
    className={clsx(
      "h-full scroll-smooth bg-white antialiased",
      inter.className
    )}>
      <body className="flex h-full flex-col">
        <Header />
        <main className="flex-1 p-6 mx-auto w-full max-w-7xl lg:px-8">
          {children}
        </main>
      </body>
    </html>
  )
}
