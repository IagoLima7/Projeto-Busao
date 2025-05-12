import './globals.css'

export const metadata = {
  title: 'Vai de Busão - Transporte Público do Maranhão',
  description: 'Informações sobre transporte público no Maranhão',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-[#FAFAFA] text-[#333333] font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
