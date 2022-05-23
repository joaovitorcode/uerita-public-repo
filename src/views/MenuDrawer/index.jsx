// Módulos
import NextLink from 'next/link'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  VStack,
  Button,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import {
  MdAccountCircle,
  MdMode,
  MdSettings,
  MdHelp,
  MdGavel,
  MdLogout,
  MdAdminPanelSettings,
} from 'react-icons/md'

// Diretórios
import { Item } from './Item'
import { useAuth } from '../../hooks/useAuth'

export const MenuDrawer = ({ isOpen, onClose }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const { signOut, currentUser, currentUserData } = useAuth()

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="xs">
      <DrawerOverlay />
      <DrawerContent bg={bg}>
        <DrawerBody p={0} borderBottomWidth="1px">
          <VStack spacing="3px" mt="3px" w="full">
            {currentUser && (
              <NextLink href={`/${currentUserData.identity}`} passHref>
                <Link _hover={{ textDecoration: 'none' }} w="full">
                  <Item icon={<MdAccountCircle size="1.5rem" />}>
                    {currentUserData.name}
                  </Item>
                </Link>
              </NextLink>
            )}
            {currentUserData?.status === 'moderador' && (
              <NextLink href={`/moderation`} passHref>
                <Link _hover={{ textDecoration: 'none' }} w="full">
                  <Item icon={<MdAdminPanelSettings size="1.5rem" />}>
                    Moderação
                  </Item>
                </Link>
              </NextLink>
            )}
            {currentUser && (
              <NextLink href={`/${currentUserData.identity}/post/new`} passHref>
                <Link _hover={{ textDecoration: 'none' }} w="full">
                  <Item icon={<MdMode size="1.5rem" />}>Escrever</Item>
                </Link>
              </NextLink>
            )}
            {currentUser && (
              <NextLink href={`/settings`} passHref>
                <Link _hover={{ textDecoration: 'none' }} w="full">
                  <Item icon={<MdSettings size="1.5rem" />}>Configurações</Item>
                </Link>
              </NextLink>
            )}
            <Item icon={<MdHelp size="1.5rem" />}>Ajuda</Item>
            <Item icon={<MdGavel size="1.5rem" />}>Nossas regras</Item>
            {currentUser && (
              <Item icon={<MdLogout size="1.5rem" />} onClick={() => signOut()}>
                Sair da conta
              </Item>
            )}
          </VStack>
        </DrawerBody>
        <DrawerFooter p={4}>
          <VStack spacing={2} w="full">
            <Button variant="link" fontSize="sm" fontWeight="regular">
              Termos de serviço
            </Button>
            <Button variant="link" fontSize="sm" fontWeight="regular">
              Termos de privacidade
            </Button>
            <Button variant="link" fontSize="sm" fontWeight="regular">
              Termos de cookies
            </Button>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
