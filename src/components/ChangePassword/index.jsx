/* eslint-disable react/no-children-prop */
// Módulos
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Center,
  VStack,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  useColorModeValue,
  chakra,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { MdLock } from 'react-icons/md'

// Diretórios
import { Card } from '../Card'
import { useAuth } from '../../hooks/useAuth'
import { schema } from '../../utils/schema'

export const ChangePassword = () => {
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')
  const { resetPassword } = useAuth()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema.changePassword) })
  const toast = useToast()

  const onSubmit = async data => {
    try {
      await resetPassword(router.query.oobCode, data.password)
      toast({
        description: 'Senha alterada com sucesso',
        status: 'success',
      })
    } catch (error) {
      toast({
        description: error.message,
        status: 'success',
      })
    }
  }

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)}>
      <Center>
        <Card as={VStack} spacing={4} w={96} p={8}>
          <Heading size="lg">Alterar senha</Heading>
          <FormControl isInvalid={errors.password}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdLock color={secondaryColor} />}
              />
              <Input
                variant="filled"
                type="password"
                placeholder="Nova senha"
                {...register('password')}
              />
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.confirmPassword}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdLock color={secondaryColor} />}
              />
              <Input
                variant="filled"
                type="password"
                placeholder="Confirmar senha"
                {...register('confirmPassword')}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.confirmPassword && 'passwords should match'}
            </FormErrorMessage>
          </FormControl>
          <Button isFullWidth type="submit" variant="brand">
            Alterar
          </Button>
        </Card>
      </Center>
    </chakra.form>
  )
}
