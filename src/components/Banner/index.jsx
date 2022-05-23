// Módulos
import {
  Flex,
  Container,
  Box,
  Icon,
  Text,
  Spacer,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdErrorOutline } from 'react-icons/md'

// Diretórios
import { useAuth } from '../../hooks/useAuth'

export const Banner = () => {
  const bgBanner = useColorModeValue('red.600', 'red.900')
  const bgIcon = useColorModeValue('red.500', 'red.800')
  const { currentUser, resendEmailVerification } = useAuth()

  return (
    <Flex
      w="full"
      h={{ base: 'auto', md: 14 }}
      bg={bgBanner}
      zIndex="dropdown"
      pos="sticky"
      top={0}
    >
      <Container
        d="flex"
        alignItems="center"
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
        maxW="container.md"
        h="full"
        px={{ base: 4, md: 7 }}
        py={4}
      >
        <Box
          d={{ base: 'none', md: 'flex' }}
          alignItems="center"
          borderRadius="base"
          p={2}
          bg={bgIcon}
          mr={4}
        >
          <Icon as={MdErrorOutline} w={6} h={6} color="white" />
        </Box>
        <Text
          textAlign={{ base: 'center', md: 'start' }}
          fontSize="sm"
          fontWeight="medium"
          color="white"
        >
          Enviamos um e-mail para o endereço{' '}
          <strong>{currentUser?.email}</strong>.
        </Text>
        <Spacer />
        <Button
          w={{ base: 'full', md: 'auto' }}
          size="sm"
          variant="banner"
          mt={{ base: 4, md: 0 }}
          onClick={() => resendEmailVerification()}
        >
          Enviar novamente
        </Button>
      </Container>
    </Flex>
  )
}
