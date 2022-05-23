// Módulos
import { IconButton, useColorModeValue } from '@chakra-ui/react'
import { MdFileUpload } from 'react-icons/md'

export const UploadButton = ({ ...rest }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const green = useColorModeValue('#00A884', '#37F6B6')

  return (
    <IconButton
      aria-label="Botão de upload da imagem de capa"
      icon={<MdFileUpload size="1.5rem" color={green} />}
      borderRadius="full"
      bg={bg}
      borderWidth="2px"
      borderColor={green}
      {...rest}
    />
  )
}
