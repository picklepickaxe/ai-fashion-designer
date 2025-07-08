import './globals.css'

export const metadata = {
  title: 'AI Fashion Design Generator',
  description: 'Tailwind v3 + Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

