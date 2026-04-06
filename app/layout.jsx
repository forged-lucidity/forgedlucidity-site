export const metadata = {
  title: 'Forged Lucidity',
  description: 'A unified framework for consciousness and physics. Cx = Φ × C²',
  openGraph: {
    title: 'Forged Lucidity',
    description: 'A unified framework for consciousness and physics.',
    url: 'https://forgedlucidity.ai',
    siteName: 'Forged Lucidity',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: 'hidden', background: '#F4F1E8' }}>
        {children}
      </body>
    </html>
  )
}
