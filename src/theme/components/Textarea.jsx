export const Textarea = {
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    outline: props => ({
      bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
      borderRadius: 'base',
    }),
  },
  // The default `size` or `variant` values
  defaultProps: {
    focusBorderColor: 'green.600',
  },
}
