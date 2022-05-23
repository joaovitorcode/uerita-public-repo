// Módulos
import {
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useBreakpointValue,
  VisuallyHidden,
} from '@chakra-ui/react'

export const Counter = ({ icon, children, visuallyHidden, ...rest }) => {
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')
  const useIcon = useBreakpointValue({ base: false, md: true })

  return (
    <Flex align="center" color="gray.600" {...rest}>
      {useIcon && <Icon color={secondaryColor} as={icon} mr={1} />}
      <Text color={secondaryColor} fontSize="sm">
        {children}
      </Text>
      <VisuallyHidden>{visuallyHidden}</VisuallyHidden>
    </Flex>
  )
}
