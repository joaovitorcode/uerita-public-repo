// Módulos
import {
  IconButton,
  useColorModeValue,
  useColorMode,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

export const ToggleColorModeButton = () => {
  const bg = useColorModeValue('#1A202C', 'white')
  const { colorMode, toggleColorMode } = useColorMode()
  const sizeIcon = useBreakpointValue({ base: '1.25rem', md: '1.5rem' })
  const sizeButton = useBreakpointValue({ base: 'sm', md: 'md' })

  return (
    <>
      {colorMode === 'light' ? (
        <IconButton
          aria-label="Botão de modo cores"
          icon={<MdOutlineDarkMode size={sizeIcon} color={bg} />}
          variant="ghost"
          borderRadius="full"
          size={sizeButton}
          onClick={toggleColorMode}
        />
      ) : (
        <IconButton
          icon={<MdOutlineLightMode size={sizeIcon} color={bg} />}
          variant="ghost"
          borderRadius="full"
          size={sizeButton}
          onClick={toggleColorMode}
        />
      )}
    </>
  )
}
