// Módulos
import { useState } from 'react'
import NextLink from 'next/link'
import { Flex, IconButton, Text, useColorModeValue } from '@chakra-ui/react'
import { FaRegComment, FaComment } from 'react-icons/fa'

export const CommentButton = ({ count, href, ...rest }) => {
  const [isActive, setIsActive] = useState(false)
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')
  const green = useColorModeValue('#09C385', '#37F6B6')

  return (
    <Flex align="center" {...rest}>
      <NextLink href={href} passHref>
        <IconButton
          aria-label="Botão de comentários"
          icon={
            isActive ? (
              <FaComment size="1.125rem" color={green} />
            ) : (
              <FaRegComment size="1.125rem" color={secondaryColor} />
            )
          }
          size="sm"
          borderRadius="full"
          variant="ghost"
          onClick={() => setIsActive(value => !value)}
          mr={2}
        />
      </NextLink>
      <Text fontSize="sm" fontWeight="semibold" color={secondaryColor}>
        {count}
      </Text>
    </Flex>
  )
}
