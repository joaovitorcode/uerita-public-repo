/* eslint-disable react/no-children-prop */
// Módulos
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Flex,
  Box,
  Divider,
  Text,
  useColorModeValue,
  useBreakpointValue,
  chakra,
  Link,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { MdEmail, MdLock } from 'react-icons/md'

// Diretórios
import { useAuth } from '../../hooks/useAuth'
import { schema } from '../../utils/schema'

export const AuthModal = ({ isOpen, onClose }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const secondaryColor = useColorModeValue('gray.600', 'gray.300')
  const modalFull = useBreakpointValue({ base: 'full', md: 'sm' })
  const { signIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema.signIn) })
  const toast = useToast()

  const onSubmit = async data => {
    try {
      await signIn(data.email, data.password)
      toast({
        description: 'Você entrou em sua conta com sucesso.',
        status: 'success',
      })
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
      })
    }
  }

  return (
    <Modal
      scrollBehavior="inside"
      size={modalFull}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent bg={bg} p={8} borderRadius={{ base: 'none', md: 'lg' }}>
        <ModalHeader p={0} pos="relative">
          Entrar no Uerita
          <ModalCloseButton
            borderRadius="full"
            pos="absolute"
            top={0}
            right={0}
          />
        </ModalHeader>
        <ModalBody p={0}>
          <chakra.form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="center" mt={4}>
              <NextLink href={`/signup`} passHref>
                <Link>
                  <Text color={secondaryColor}>Não possui uma conta?</Text>
                </Link>
              </NextLink>
              <FormControl isInvalid={errors.email}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdEmail />}
                  />
                  <Input
                    variant="filled"
                    type="email"
                    placeholder="E-mail"
                    {...register('email')}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdLock />}
                  />
                  <Input
                    variant="filled"
                    type="password"
                    placeholder="Senha"
                    {...register('password')}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <NextLink href={`/recover`} passHref>
                <Link>
                  <Text color={secondaryColor}>Esqueceu a senha?</Text>
                </Link>
              </NextLink>
              <Button isFullWidth type="submit" variant="brand">
                Entrar
              </Button>
              <Flex w="full" align="center">
                <Box flex="1">
                  <Divider borderColor="gray.300" />
                </Box>
                <Text as="span" px="3" color={secondaryColor} fontSize="sm">
                  Ou entre com
                </Text>
                <Box flex="1">
                  <Divider borderColor="gray.300" />
                </Box>
              </Flex>
              <Button colorScheme="red" variant="outline" isFullWidth>
                Google
              </Button>
              <Button variant="black" isFullWidth>
                Apple
              </Button>
              <Button colorScheme="blue" variant="outline" isFullWidth>
                Facebook
              </Button>
            </VStack>
          </chakra.form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
