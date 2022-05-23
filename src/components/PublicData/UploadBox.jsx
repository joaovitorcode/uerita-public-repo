// Módulos
import {
  VStack,
  Icon,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { MdFileUpload } from 'react-icons/md'

export const UploadBox = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const secondaryColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <VStack
      spacing={1}
      w="full"
      p={4}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="base"
    >
      <Icon as={MdFileUpload} w={6} h={6} />
      <Text fontSize="sm" color={secondaryColor}>
        Clique para adicionar ou arraste e solte
      </Text>
      <Text fontSize="sm" color={secondaryColor}>
        PNG, JPG ou GIF até 2MB
      </Text>
      <VisuallyHidden>Caixa de upload de imagem de perfil</VisuallyHidden>
    </VStack>
  )
}
