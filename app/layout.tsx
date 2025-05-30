import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Bright Smile Dental Clinic - AI-Powered Dental Care",
  description:
    "Experience the future of dental care with our revolutionary AI assistant, advanced 3D diagnostics, and world-class treatments. Book your appointment today!",
  keywords: "dental care, AI dentist, teeth cleaning, dental emergency, cosmetic dentistry, dental clinic",
  authors: [{ name: "Bright Smile Dental Clinic" }],
  creator: "Bright Smile Dental Clinic",
  publisher: "Bright Smile Dental Clinic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://brightsmile.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bright Smile Dental Clinic - AI-Powered Dental Care",
    description: "Experience the future of dental care with our revolutionary AI assistant and world-class treatments.",
    url: "https://brightsmile.com",
    siteName: "Bright Smile Dental Clinic",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bright Smile Dental Clinic",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bright Smile Dental Clinic - AI-Powered Dental Care",
    description: "Experience the future of dental care with our revolutionary AI assistant and world-class treatments.",
    images: ["/twitter-image.jpg"],
    creator: "@brightsmileclinic",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16 lg:pt-20">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
