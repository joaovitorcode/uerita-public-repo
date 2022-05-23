// Módulos
import { Text, useBreakpointValue } from '@chakra-ui/react'

export const CounterNotification = ({ ...rest }) => {
  const fontSize = useBreakpointValue({ base: 'xs', md: 'sm' })

  return (
    <Text
      h="1.375rem"
      bg="red.500"
      px={2}
      borderRadius={12}
      color="white"
      fontSize={fontSize}
      fontWeight="semibold"
      {...rest}
    >
      1
    </Text>
  )
}
