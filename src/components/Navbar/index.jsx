/* eslint-disable no-unused-vars */
// Módulos
import NextLink from 'next/link'
import {
  Box,
  Container,
  Image,
  Spacer,
  HStack,
  useColorModeValue,
  useColorMode,
  Link,
  SkeletonCircle,
} from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'

// Diretórios
import { SearchButton } from './SearchButton'
import { NotificationButton } from './NotificationButton'
import { MenuButton } from './MenuButton'
import { ToggleColorModeButton } from './ToggleColorModeButton'
import { AuthButton } from './AuthButton'
import { useAuth } from '../../hooks/useAuth'
import { auth } from '../../../firebaseClient'

export const Navbar = () => {
  const bg = useColorModeValue('white', 'gray.800')
  const { colorMode } = useColorMode()
  const { currentUser } = useAuth()
  const [isAuthenticated, isLoading] = useAuthState(auth)

  return (
    <Box
      as="header"
      w="full"
      h={14}
      bg={bg}
      shadow="md"
      zIndex="docked"
      pos="sticky"
      top={0}
    >
      <Container
        maxW="container.md"
        h="full"
        d="flex"
        alignItems="center"
        px={{ base: 4, md: 7 }}
      >
        <NextLink href="/" passHref>
          <Link>
            <Image
              alt="Logo Uerita"
              src={
                colorMode === 'light'
                  ? '/images/logo_light.svg'
                  : '/images/logo_dark.svg'
              }
            />
          </Link>
        </NextLink>
        <Spacer />
        <HStack spacing={4}>
          {isLoading ? (
            <>
              <SkeletonCircle />
              <SkeletonCircle />
              <SkeletonCircle />
              <SkeletonCircle />
            </>
          ) : (
            <>
              <SearchButton />
              {currentUser && <NotificationButton />}
              <MenuButton />
              <ToggleColorModeButton />
              {!currentUser && <AuthButton />}
            </>
          )}
        </HStack>
      </Container>
    </Box>
  )
}
