/* eslint-disable react/no-children-prop */
// Módulos
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  Divider,
  FormHelperText,
  Button,
  useColorModeValue,
  chakra,
  useToast,
} from '@chakra-ui/react'
import { MdLock, MdEmail } from 'react-icons/md'
import { useState } from 'react'

// Diretórios
import { Card } from '../Card'
import { useAuth } from '../../hooks/useAuth'

export const PrivateData = ({ ...rest }) => {
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')
  const { newAuthenticate, updateEmail, updatePassword } = useAuth()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const toast = useToast()

  const handleEmail = async () => {
    if (newEmail !== confirmEmail) {
      return toast({
        description: 'Os campos de e-mail não batem.',
        status: 'error',
        duration: 5000,
      })
    }

    try {
      await newAuthenticate(currentPassword)
      await updateEmail(newEmail)
      toast({
        description: 'E-mail alterado com sucesso.',
        status: 'success',
      })
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
      })
    }
  }

  const handlePassword = async () => {
    if (newPassword !== confirmPassword) {
      return toast({
        description: 'Os campos de senha não batem.',
        status: 'error',
        duration: 5000,
      })
    }

    try {
      await newAuthenticate(currentPassword)
      await updatePassword(newPassword)
      toast({
        description: 'Senha alterada com sucesso.',
        status: 'success',
      })
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
      })
    }
  }

  const onSubmit = e => {
    e.preventDefault()

    if (currentPassword === '') {
      return toast({
        description: 'Insira a senha atual para confirmar as alterações.',
        status: 'error',
      })
    }

    if (newEmail !== '') {
      handleEmail()
    }

    if (newPassword === '') {
      if (newPassword.length >= 8 && newPassword.length <= 15) handlePassword()
    }
  }

  return (
    <chakra.form onSubmit={onSubmit}>
      <Card as={VStack} spacing={4} align="start" {...rest}>
        <FormControl>
          <FormLabel fontWeight="semibold">Nova senha</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdLock color={secondaryColor} />}
            />
            <Input
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              variant="outline"
              type="password"
              placeholder="********"
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="semibold">Confirmar senha</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdLock color={secondaryColor} />}
            />
            <Input
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              variant="outline"
              type="password"
              placeholder="********"
            />
          </InputGroup>
        </FormControl>
        <Divider />
        <FormControl>
          <FormLabel fontWeight="semibold">Novo e-mail</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdEmail color={secondaryColor} />}
            />
            <Input
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              variant="outline"
              type="email"
              placeholder="seuemail@provedor.com"
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="semibold">Confirmar e-mail</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdEmail color={secondaryColor} />}
            />
            <Input
              value={confirmEmail}
              onChange={e => setConfirmEmail(e.target.value)}
              variant="outline"
              type="email"
              placeholder="seuemail@provedor.com"
            />
          </InputGroup>
        </FormControl>
        <Divider />
        <FormControl>
          <FormLabel fontWeight="semibold">Senha atual</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdLock color={secondaryColor} />}
            />
            <Input
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              variant="outline"
              type="password"
              placeholder="********"
            />
          </InputGroup>
          <FormHelperText>
            Insira sua senha atual para confirmar as mudanças realizadas
          </FormHelperText>
        </FormControl>
        <Button type="submit" variant="brand">
          Salvar
        </Button>
      </Card>
    </chakra.form>
  )
}
