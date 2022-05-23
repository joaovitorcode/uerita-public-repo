// Módulos
import { Text, Spacer, useColorModeValue } from '@chakra-ui/react'

// Diretórios
import { Identity } from '../Identity'
import { Card } from '../Card'
import { FollowButton } from '../FollowButton'
import { useAuth } from '../../hooks/useAuth'

export const User = ({ user, ...rest }) => {
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')
  const { currentUser } = useAuth()

  return (
    <Card align="center" {...rest}>
      <Identity user={user} mr={1} />
      <Text fontSize="sm" fontWeight="semibold" mr={1}>
        {user.followers.length}
      </Text>
      <Text fontSize="sm" color={secondaryColor}>
        Seguidores
      </Text>
      <Spacer />
      {user.id !== currentUser?.uid && <FollowButton user={user} />}
    </Card>
  )
}
