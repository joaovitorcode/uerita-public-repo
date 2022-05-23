// Módulos
import {
  Grid,
  GridItem,
  Avatar,
  Text,
  Icon,
  useColorModeValue,
  useBreakpointValue,
  Spacer,
  Tooltip,
  Flex,
} from '@chakra-ui/react'
import { MdVerified } from 'react-icons/md'

// Diretórios
import { Card } from '../Card'
import { MoreOptions } from './MoreOptions'
import { FollowButton } from '../FollowButton'
import { useAuth } from '../../hooks/useAuth'

export const Profile = ({ user }) => {
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')
  const green = useColorModeValue('#00A884', '#37F6B6')
  const useButtonMobile = useBreakpointValue({ base: true, md: false })
  const { currentUser } = useAuth()

  return (
    <Card>
      <Grid
        w="full"
        templateColumns="6rem 1fr"
        templateRows="2rem 2rem 2rem 1fr"
      >
        <GridItem rowSpan={3} colSpan={1}>
          <Avatar size="xl" name={user.name} src={user.photoURL} />
        </GridItem>
        <GridItem align="end">
          <MoreOptions user={user} currentUser={currentUser} />
        </GridItem>
        <GridItem d="flex" alignItems="center" ml={2}>
          <Text fontSize="xl" fontWeight="semibold">
            {user.name}
          </Text>
          {user.verified && (
            <Tooltip
              pos="absolute"
              top="2px"
              label="Perfil verificado"
              aria-label="Perfil verificado"
              placement="top"
            >
              <Flex>
                <Icon
                  as={MdVerified}
                  w="1.125rem"
                  h="1.125rem"
                  color={green}
                  ml={1}
                />
              </Flex>
            </Tooltip>
          )}
        </GridItem>
        <GridItem d="flex" alignItems="center" ml={2}>
          <Text fontSize="sm" color={secondaryColor} mr={4}>
            {user.following.length} Seguindo
          </Text>
          <Text fontSize="sm" color={secondaryColor}>
            {user.followers.length} Seguidores
          </Text>
          {!useButtonMobile && user?.id !== currentUser?.uid && (
            <>
              <Spacer />
              <FollowButton user={user} />
            </>
          )}
        </GridItem>
        {useButtonMobile && user?.id !== currentUser?.uid && (
          <GridItem colSpan={2} d="flex" alignItems="center" mt={4}>
            <FollowButton user={user} isFullWidth />
          </GridItem>
        )}
        {user.bio && (
          <GridItem colSpan={2}>
            <Text
              fontSize="sm"
              color={secondaryColor}
              textAlign="center"
              mt={4}
            >
              {user.bio}
            </Text>
          </GridItem>
        )}
      </Grid>
    </Card>
  )
}
