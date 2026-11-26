import React from 'react'

export const metadata = {
  description: 'Things to do with kids in Las Vegas.',
  title: 'Kids Do Vegas',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
