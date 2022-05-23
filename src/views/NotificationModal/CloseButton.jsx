// Módulos
import { IconButton, useColorModeValue } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

export const CloseButton = ({ ...rest }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const secondaryColor = useColorModeValue('gray.600', 'gray.300')
  const borderColor = useColorModeValue('blackAlpha.300', 'blackAlpha.600')

  return (
    <IconButton
      aria-label="Botão de limpar a notificação"
      icon={<MdClose size="1.5rem" />}
      borderRadius="full"
      color={secondaryColor}
      bg={bg}
      shadow="md"
      borderWidth="1px"
      borderColor={borderColor}
      {...rest}
    />
  )
}
