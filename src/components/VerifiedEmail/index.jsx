/* eslint-disable react/no-children-prop */
// Módulos
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  Center,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'

// Diretórios
import { Card } from '../Card'
import { useAuth } from '../../hooks/useAuth'

export const VerifiedEmail = () => {
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')
  const { verifyEmail } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = async () => {
      try {
        await verifyEmail(router.query.oobCode)
      } catch (error) {
        console.log(error)
        router.push('/')
      }
    }
    return unsubscribe
  }, [router, verifyEmail])

  return (
    <Center>
      <Card as={VStack} spacing={4} w={96} p={8}>
        <Heading size="lg">E-mail verificado</Heading>
        <Text fontSize="sm" textAlign="center" color={secondaryColor}>
          Parabéns, o seu e-mail foi verificado com sucesso. Você já pode
          navegar pelo Uerita.
        </Text>
        <Button onClick={() => router.push('/')} isFullWidth variant="default">
          Página inicial
        </Button>
      </Card>
    </Center>
  )
}
