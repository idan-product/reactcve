export const metadata = {
  title: 'Vulnerable Next.js Research',
  description: 'Intentionally vulnerable application for research purposes',
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

