export const Button = {
  // Styles for the base style
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'base',
  },
  // Styles for the size variations
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4,
      py: 3,
    },
    md: {
      fontSize: 'md',
      px: 6,
      py: 4,
    },
  },
  // Styles for the visual style variations
  variants: {
    link: props => ({
      fontWeight: 'regular',
      color: props.colorMode === 'dark' ? 'gray.300' : 'gray.600',
      _hover: {
        color: props.colorMode === 'dark' ? 'gray.200' : 'gray.700',
      },
      _active: {
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
      },
    }),
    menu: props => ({
      color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      justifyContent: 'flex-start',
      p: 8,
      borderRadius: 'none',
      fontWeight: 'medium',
      bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
      _hover: {
        bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
      },
      _active: {
        bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
      },
    }),
    brand: props => ({
      color: props.colorMode === 'dark' ? 'green.300' : 'white',
      bg: props.colorMode === 'dark' ? 'gray.700' : 'green.600',
      _hover: {
        bg: props.colorMode === 'dark' ? 'gray.600' : 'green.700',
      },
      _active: {
        bg: props.colorMode === 'dark' ? 'gray.500' : 'green.800',
      },
    }),
    default: props => ({
      bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
      _hover: {
        bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
      },
      _active: {
        bg: props.colorMode === 'dark' ? 'gray.500' : 'gray.400',
      },
    }),
    destructive: props => ({
      color: props.colorMode === 'dark' ? 'red.300' : 'white',
      bg: props.colorMode === 'dark' ? 'gray.700' : 'red.500',
      _hover: {
        bg: props.colorMode === 'dark' ? 'gray.600' : 'red.600',
      },
      _active: {
        bg: props.colorMode === 'dark' ? 'gray.500' : 'red.700',
      },
    }),
    banner: props => ({
      color: 'white',
      bg: props.colorMode === 'dark' ? 'red.800' : 'red.500',
      _hover: {
        bg: props.colorMode === 'dark' ? 'red.700' : 'red.400',
      },
      _active: {
        bg: props.colorMode === 'dark' ? 'red.600' : 'red.300',
      },
    }),
    black: props => ({
      color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
      _hover: {
        bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
      },
      _active: {
        bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
      },
      border: 'solid 1px',
      borderColor: props.colorMode === 'dark' ? 'white' : 'gray.800',
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {
    variant: 'solid',
  },
}
