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
import { ComponentLoader } from '../ComponentLoader'
import { useAuth } from '../../hooks/useAuth'

export const Reply = ({ reply, ...rest }) => {
  const borderColor = useColorModeValue('blackAlpha.200', 'blackAlpha.600')
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' })
  moment.locale('pt-br')
  const router = useRouter()
  const { currentUser } = useAuth()

  const [replies, setReplies] = useState([])
  useEffect(() => {
    const unsub = async () => {
      setReplies(await getCommentsByParentId(reply.id))
    }
    return unsub()
  }, [reply])

  if (_.isEmpty(reply)) return <ComponentLoader h="132px" />
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
        <Identity user={reply.authorInfos} />
        <Spacer />
        <Counter icon={MdCalendarToday} visuallyHidden="Data de publicação">
          {router.pathname === '/[userId]/comment/[commentId]'
            ? moment(reply.date).format('D MMM YYYY • H:mm')
            : moment(reply.date).fromNow()}
        </Counter>
      </Flex>
      <Text w="full" fontSize={fontSize}>
        {reply.body}
      </Text>
      <Flex w="full">
        <VoteButtons comment={reply} mr={4} />
        <CommentButton
          href={`/${reply.authorInfos.identity}/comment/${reply.id}`}
          count={replies.length}
        />
        <Spacer />
        <MoreOptions reply={reply} currentUser={currentUser} />
      </Flex>
    </Card>
  )
}
