export const metadata = {
  title: 'Sinyu Tool',
  description: 'Kumpulan tools berguna dalam satu web',
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
