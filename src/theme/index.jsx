// Módulos
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// Diretórios
import { Button } from './components/Button'
import { Input } from './components/Input'
import { Textarea } from './components/Textarea'

const global = props => ({
  body: {
    bg: mode('gray.50', 'gray.900')(props),
    w: '100vw',
    h: '100vh',
    overflowX: 'hidden',
  },
})

const overrides = {
  styles: {
    global,
  },
  components: {
    Button: { ...Button },
    Input: { ...Input },
    Textarea: { ...Textarea },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    green: {
      50: '#BBFCE6',
      100: '#8FFAD6',
      200: '#63F8C6',
      300: '#37F6B6',
      400: '#0BF4A6',
      500: '#09C385',
      600: '#00A884',
      700: '#056242',
      800: '#023121',
      900: '#081C15',
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
}

export const theme = extendTheme(overrides)

/*
export const component = {
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {},
  // The default `size` or `variant` values
  defaultProps: {},
}
*/
