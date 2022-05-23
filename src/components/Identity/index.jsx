// Módulos
import NextLink from 'next/link'
import {
  Flex,
  Avatar,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Icon,
  Tooltip,
  Link,
} from '@chakra-ui/react'
import { MdVerified } from 'react-icons/md'

export const Identity = ({ user, ...rest }) => {
  const green = useColorModeValue('#00A884', '#37F6B6')
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' })
  const iconSize = useBreakpointValue({ base: '1rem', md: '1.125rem' })

  return (
    <Flex align="center" {...rest}>
      <NextLink href={`/${user?.identity}`} passHref>
        <Link>
          <Avatar src={user.photoURL} size="sm" mr={1} />
        </Link>
      </NextLink>
      <NextLink href={`/${user?.identity}`} passHref>
        <Link style={{ textDecoration: 'none' }}>
          <Text isTruncated fontSize={fontSize} fontWeight="semibold" mr={1}>
            {user?.name}
          </Text>
        </Link>
      </NextLink>
      {user?.verified && (
        <Tooltip
          pos="absolute"
          top="2px"
          label="Perfil verificado"
          aria-label="Perfil verificado"
          placement="top"
        >
          <Flex>
            <Icon as={MdVerified} w={iconSize} h={iconSize} color={green} />
          </Flex>
        </Tooltip>
      )}
    </Flex>
  )
}
