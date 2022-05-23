// Módulos
import Router from 'next/router'
import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { MdSearch } from 'react-icons/md'

export const Item = ({ post, children, ...rest }) => {
  const bgHover = useColorModeValue('gray.100', 'gray.700')
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')

  return (
    <Box
      w="full"
      h={8}
      _hover={{ backgroundColor: bgHover }}
      borderRadius="base"
      d="flex"
      alignItems="center"
      cursor="pointer"
      py={4}
      onClick={() =>
        Router.push(`/${post.authorInfos.identity}/post/${post.id}`)
      }
      {...rest}
    >
      <Box mx={2} mr={4}>
        <MdSearch size="1.5rem" color={secondaryColor} />
      </Box>
      <Text isTruncated>{children}</Text>
    </Box>
  )
}
