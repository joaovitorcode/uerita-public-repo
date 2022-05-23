// Módulos
import { Button } from '@chakra-ui/react'

export const Item = ({ children, icon, ...rest }) => {
  return (
    <Button w="full" variant="menu" leftIcon={icon} {...rest}>
      {children}
    </Button>
  )
}
