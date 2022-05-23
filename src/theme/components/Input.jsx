export const Input = {
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {
    md: {
      field: {
        borderRadius: 'base',
      },
    },
  },
  // Styles for the visual style variations
  variants: {
    filled: props => ({
      field: {
        bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
        _hover: {
          bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
        },
        _focus: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderColor: 'green.600',
        },
        _placeholder: {
          color: 'gray.500',
        },
      },
    }),
    outline: props => ({
      field: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
      },
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {
    variant: 'filled',
    focusBorderColor: 'green.600',
  },
}
