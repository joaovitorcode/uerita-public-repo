// Módulos
import { Flex, useColorModeValue, useBreakpointValue } from '@chakra-ui/react'

export const Card = ({ children, semantic, ...rest }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const borderRadius = useBreakpointValue({ base: 'none', md: 'lg' })

  return (
    <Flex
      w="full"
      p={4}
      bg={bg}
      shadow="md"
      borderRadius={borderRadius}
      {...rest}
    >
      {children}
    </Flex>
  )
}
