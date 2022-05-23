// Módulos
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

// Diretórios
import { theme } from '../theme'
import { AuthContextProvider } from '../hooks/useAuth'
import '../theme/markdown.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContextProvider>
  )
}
