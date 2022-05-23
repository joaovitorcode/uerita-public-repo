// Módulos
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import {
  VStack,
  Flex,
  Spacer,
  HStack,
  Heading,
  useBreakpointValue,
  Link,
} from '@chakra-ui/react'
import {
  MdAccessTimeFilled,
  MdVisibility,
  MdCalendarToday,
} from 'react-icons/md'
import _ from 'lodash'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import moment from 'moment'
import 'moment/locale/pt-br'
import { doc, updateDoc, increment } from 'firebase/firestore'
import { db } from '../../../firebaseClient'

// Diretórios
import { Card } from '../Card'
import { Cover } from './Cover'
import { Identity } from '../Identity'
import { MoreOptions } from './MoreOptions'
import { Counter } from '../Counter'
import { VoteButtons } from './VoteButtons'
import { CommentButton } from '../CommentButton'
import { ShareButton } from './ShareButton'
import { Reply } from '../Reply'
import { WriteComment } from '../WriteComment'
import { FullPageLoader } from '../FullPageLoader'
import { getCommentsByParentId } from '../../helpers/getCommentsByParentId'
import { useAuth } from '../../hooks/useAuth'

export const Post = ({ post, ...rest }) => {
  const [replies, setReplies] = useState([])

  useEffect(() => {
    const incrementReadCounter = async () => {
      try {
        await updateDoc(doc(db, 'posts', post.id), {
          readCounter: increment(1),
        })
      } catch (error) {
        console.log(error)
      }
    }
    const unsub = async () => {
      setReplies(await getCommentsByParentId(post.id))
      incrementReadCounter()
    }
    return unsub()
  }, [post])

  const router = useRouter()
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' })
  const { currentUser } = useAuth()
  if (_.isEmpty(post)) return <FullPageLoader />
  moment.locale('pt-br')

  return (
    <Card as={VStack} spacing={4} align="start" {...rest}>
      <Flex w="full" align="center">
        <Identity user={post.authorInfos} />
        <Spacer />
        <HStack spacing={4}>
          <Counter icon={MdAccessTimeFilled} visuallyHidden="Tempo de leitura">
            {moment.utc(post.readTime * 1000).format('mm:ss')}
          </Counter>
          <Counter icon={MdVisibility} visuallyHidden="Quantidade de leituras">
            {post.readCounter}
          </Counter>
          <Counter icon={MdCalendarToday} visuallyHidden="Data de publicação">
            {router.pathname === '/[userId]/post/[postId]'
              ? moment(post.date).format('D MMM YYYY • H:mm')
              : moment(post.date).fromNow()}
          </Counter>
        </HStack>
      </Flex>
      <NextLink href={`/${post.authorInfos.identity}/post/${post.id}`} passHref>
        <Link style={{ textDecoration: 'none' }}>
          <Heading size={fontSize} fontWeight="semibold">
            {post.title}
          </Heading>
        </Link>
      </NextLink>
      <Cover
        src={post.coverURL}
        alt={`Capa de ${post.title}`}
        href={`/${post.authorInfos.identity}/post/${post.id}`}
      />
      {router.pathname === '/[userId]/post/[postId]' && (
        <ReactMarkdown className="markdown" remarkPlugins={[gfm]}>
          {post.body}
        </ReactMarkdown>
      )}
      <Flex w="full" align="center">
        <VoteButtons post={post} mr={4} />
        <CommentButton
          count={replies.length}
          href={`/${post.authorInfos.identity}/post/${post.id}`}
          mr={4}
        />
        <ShareButton post={post} />
        <Spacer />
        <MoreOptions post={post} currentUser={currentUser} />
      </Flex>
      {router.pathname === '/[userId]/post/[postId]' && (
        <VStack w="full" spacing={4}>
          {currentUser && <WriteComment parentId={post.id} postId={post.id} />}
          {replies.map(r => (
            <Reply key={r.id} reply={r} borderRadius="base" />
          ))}
        </VStack>
      )}
    </Card>
  )
}
