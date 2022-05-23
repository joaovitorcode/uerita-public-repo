// Módulos
import Image from 'next/image'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import {
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Link,
} from '@chakra-ui/react'
import {
  MdAccessTimeFilled,
  MdVisibility,
  MdCalendarToday,
} from 'react-icons/md'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/pt-br'

// Diretórios
import { Counter } from '../Counter'
import { getPostById } from '../../helpers/getPostById'
import { ComponentLoader } from '../../components/ComponentLoader'

export const Thumbnail = ({ comment, ...rest }) => {
  const [post, setPost] = useState([])

  useEffect(() => {
    const unsub = async () => {
      setPost(await getPostById(comment.postId))
    }
    return unsub()
  }, [comment])

  const bg = useColorModeValue('white', 'gray.800')
  const useCounterMobile = useBreakpointValue({ base: true, md: false })
  const headingSize = useBreakpointValue({ base: 'xs', md: 'sm' })
  const imageWidth = useBreakpointValue({ base: 382, md: 178 })
  const imageHeight = useBreakpointValue({ base: 214, md: 100 })
  moment.locale('pt-br')

  if (_.isEmpty(post)) return <ComponentLoader h="132px" />

  return (
    <Grid
      templateColumns="11.125rem 1fr"
      templateRows="44px 28px 28px"
      w="full"
      p={4}
      bg={bg}
      shadow="md"
      borderRadius={{ base: 'none', md: 'lg' }}
      {...rest}
    >
      <GridItem rowSpan={3} colSpan={{ base: 2, md: 1 }}>
        <NextLink
          href={`/${post.authorInfos.identity}/post/${post.id}`}
          passHref
        >
          <Link style={{ textDecoration: 'none' }}>
            <Image
              src={post.coverURL}
              alt="Capa da publicação"
              width={imageWidth}
              height={imageHeight}
              objectFit="cover"
              priority
              style={{ borderRadius: '4px' }}
            />
          </Link>
        </NextLink>
      </GridItem>
      <GridItem
        d="flex"
        alignItems="center"
        colSpan={{ base: 2, md: 1 }}
        ml={{ base: 0, md: 4 }}
        mt={{ base: 4, md: 0 }}
      >
        <NextLink
          href={`/${post.authorInfos.identity}/post/${post.id}`}
          passHref
        >
          <Link style={{ textDecoration: 'none' }}>
            <Heading size={headingSize} fontWeight="semibold">
              {post.title}
            </Heading>
          </Link>
        </NextLink>
      </GridItem>
      <GridItem
        colSpan={{ base: 2, md: 1 }}
        d="flex"
        alignItems="center"
        ml={{ base: 0, md: 4 }}
        mt={{ base: 4, md: 0 }}
      >
        <Text fontSize="sm" mr={4}>
          {post.authorInfos?.name}
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
            <Counter icon={MdCalendarToday} visuallyHidden="Data de publicação">
              {moment(post.date).format('D MMM YYYY • H:mm')}
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
          <Counter icon={MdCalendarToday}>
            {moment(post.date).format('D MMM YYYY • H:mm')}
          </Counter>
        </GridItem>
      )}
    </Grid>
  )
}
