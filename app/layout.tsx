import './globals.css'

export const metadata = {
  title: 'StreamScout',
  description: 'Find a list of streaming platforms instantly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
