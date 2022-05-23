// Módulos
import { Box, Container } from '@chakra-ui/react'

// Diretórios
import { Navbar } from '../Navbar'
import { Banner } from '../Banner'
import { useAuth } from '../../hooks/useAuth'

export const Layout = ({ children }) => {
  const { currentUser } = useAuth()

  return (
    <Box w="full" h="full">
      <Navbar />
      {currentUser && !currentUser?.emailVerified && <Banner />}
      <Container as="main" maxW="container.md" py={4} px={{ base: 0, md: 7 }}>
        {children}
      </Container>
    </Box>
  )
}
