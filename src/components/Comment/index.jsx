// Módulos
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {
  VStack,
  Text,
  Spacer,
  Flex,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MdCalendarToday } from 'react-icons/md'
import moment from 'moment'
import 'moment/locale/pt-br'
import _ from 'lodash'

// Diretórios
import { Card } from '../Card'
import { Identity } from '../Identity'
import { Counter } from '../Counter'
import { VoteButtons } from './VoteButtons'
import { CommentButton } from '../CommentButton'
import { MoreOptions } from './MoreOptions'
import { getCommentsByParentId } from '../../helpers/getCommentsByParentId'
import { WriteComment } from '../WriteComment'
import { Reply } from '../Reply'
import { ComponentLoader } from '../ComponentLoader'
import { useAuth } from '../../hooks/useAuth'

export const Comment = ({ comment, ...rest }) => {
  const borderColor = useColorModeValue('blackAlpha.200', 'blackAlpha.600')
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' })
  moment.locale('pt-br')
  const router = useRouter()
  const { currentUser } = useAuth()

  const [replies, setReplies] = useState([])
  useEffect(() => {
    const unsub = async () => {
      setReplies(await getCommentsByParentId(comment.id))
    }
    return unsub()
  }, [comment, router])

  if (_.isEmpty(comment)) return <ComponentLoader />
  return (
    <Card
      as={VStack}
      spacing={2}
      shadow="none"
      borderWidth="1px"
      borderColor={borderColor}
      align="start"
      {...rest}
    >
      <Flex w="full" align="center">
        <Identity user={comment.authorInfos} />
        <Spacer />
        <Counter icon={MdCalendarToday} visuallyHidden="Data de publicação">
          {router.pathname === '/[userId]/comment/[commentId]'
            ? moment(comment.date).format('D MMM YYYY • H:mm')
            : moment(comment.date).fromNow()}
        </Counter>
      </Flex>
      <Text w="full" fontSize={fontSize}>
        {comment.body}
      </Text>
      <Flex w="full">
        <VoteButtons comment={comment} mr={4} />
        <CommentButton
          href={`/${comment.authorInfos.identity}/comment/${comment.id}`}
          count={replies.length}
        />
        <Spacer />
        <MoreOptions comment={comment} currentUser={currentUser} />
      </Flex>
      <VStack w="full" spacing={4}>
        {router.pathname === '/[userId]/comment/[commentId]' && currentUser && (
          <WriteComment parentId={comment.id} postId={comment.postId} />
        )}
        {replies.map(reply => (
          <Reply key={reply.id} reply={reply} borderRadius="base" />
        ))}
      </VStack>
    </Card>
  )
}
