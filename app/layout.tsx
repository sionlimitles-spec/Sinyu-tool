import './globals.css';

export const metadata = {
  title: 'Sinyu Tool',
  description: 'Premium Utilities & Media',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
