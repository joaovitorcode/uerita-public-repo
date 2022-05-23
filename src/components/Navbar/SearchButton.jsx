// Módulos
import {
  IconButton,
  Box,
  useDisclosure,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MdSearch } from 'react-icons/md'

// Diretórios
import { SearchModal } from '../../views/SearchModal'

export const SearchButton = ({ ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('#1A202C', 'white')
  const sizeIcon = useBreakpointValue({ base: '1.25rem', md: '1.5rem' })
  const sizeButton = useBreakpointValue({ base: 'sm', md: 'md' })

  return (
    <Box {...rest}>
      <IconButton
        aria-label="Botão de pesquisa"
        icon={<MdSearch size={sizeIcon} color={bg} />}
        variant="ghost"
        borderRadius="full"
        size={sizeButton}
        onClick={onOpen}
      />
      <SearchModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
