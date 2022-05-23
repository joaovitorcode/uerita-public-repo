// Módulos
import NextLink from 'next/link'
import { useState } from 'react'
import {
  Grid,
  GridItem,
  Image,
  Heading,
  Text,
  useColorModeValue,
  useBreakpointValue,
  useToast,
  Link,
} from '@chakra-ui/react'
import {
  MdAccessTimeFilled,
  MdVisibility,
  MdCalendarToday,
} from 'react-icons/md'

// Diretórios
import { Counter } from '../../components/Counter'
import { CloseButton } from './CloseButton'
import { removeNotificationByPostId } from '../../helpers/removeNotificationByPostId'
import { useAuth } from '../../hooks/useAuth'

export const Item = ({ post, ...rest }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const bgHover = useColorModeValue('gray.100', 'gray.700')
  const useCounterMobile = useBreakpointValue({ base: true, md: false })
  const headingSize = useBreakpointValue({ base: 'xs', md: 'sm' })
  const imageWidth = useBreakpointValue({ base: 382, md: 178 })
  const imageHeight = useBreakpointValue({ base: 214, md: 100 })
  const [isMouseOver, setIsMouseOver] = useState(false)
  const { currentUser } = useAuth()
  const toast = useToast()

  const removeNotification = async () => {
    await removeNotificationByPostId(post.id, currentUser.uid)
    toast({
      description: 'Notificação lida com sucesso. Recarregue a página.',
      status: 'success',
    })
  }

  return (
    <NextLink href={`/${post.authorInfos.identity}/post/${post.id}`} passHref>
      <Link style={{ textDecoration: 'none' }}>
        <Grid
          templateColumns="10.5rem 1fr"
          templateRows="44px 1fr 1fr"
          w="full"
          p={4}
          bg={bg}
          _hover={{ bg: bgHover }}
          cursor="pointer"
          borderRadius="lg"
          pos="relative"
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
          {...rest}
        >
          <GridItem rowSpan={3} colSpan={{ base: 2, md: 1 }}>
            <Image
              src={post.coverURL}
              alt="Capa da publicação"
              width={imageWidth}
              height={imageHeight}
              objectFit="cover"
              style={{ borderRadius: '4px' }}
            />
          </GridItem>
          <GridItem
            d="flex"
            alignItems="center"
            colSpan={{ base: 2, md: 1 }}
            ml={{ base: 0, md: 4 }}
            mt={{ base: 4, md: 0 }}
          >
            <Heading size={headingSize} fontWeight="semibold">
              {post.title}
            </Heading>
          </GridItem>
          <GridItem
            colSpan={{ base: 2, md: 1 }}
            d="flex"
            alignItems="center"
            ml={{ base: 0, md: 4 }}
            mt={{ base: 4, md: 0 }}
          >
            <Text fontSize="sm" mr={4}>
              {post.authorInfos.name}
            </Text>
            {useCounterMobile && (
              <>
                <Counter
                  icon={MdAccessTimeFilled}
                  visuallyHidden="Tempo de leitura"
                  mr={4}
                >
                  {post.readTime}
                </Counter>
                <Counter
                  icon={MdVisibility}
                  visuallyHidden="Quantidade de leituras"
                  mr={4}
                >
                  {post.readCounter}
                </Counter>
                <Counter
                  icon={MdCalendarToday}
                  visuallyHidden="Data de publicação"
                >
                  há 1 ano
                </Counter>
              </>
            )}
          </GridItem>
          {!useCounterMobile && (
            <GridItem
              d="flex"
              alignItems="center"
              ml={{ base: 0, md: 4 }}
              mt={{ base: 1, md: 0 }}
            >
              <Counter icon={MdAccessTimeFilled} mr={4}>
                {post.readTime}
              </Counter>
              <Counter icon={MdVisibility} mr={4}>
                {post.readCounter}
              </Counter>
              <Counter icon={MdCalendarToday}>há 1 ano</Counter>
            </GridItem>
          )}
          {isMouseOver && (
            <CloseButton
              onClick={() => removeNotification()}
              pos="absolute"
              bottom={4}
              right={4}
            />
          )}
        </Grid>
      </Link>
    </NextLink>
  )
}
