import React from 'react'
import { ScrollViewStyleReset } from 'expo-router/html'

type RootProps = {
  children: React.ReactNode
}

const Root = ({ children }: RootProps) => {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  )
}

export default Root
