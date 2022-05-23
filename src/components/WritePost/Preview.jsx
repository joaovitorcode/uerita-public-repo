// Módulos
import {
  VStack,
  Heading,
  Flex,
  useColorModeValue,
  Image,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export const Preview = ({ title, cover, body, ...rest }) => {
  const bg = useColorModeValue('gray.100', 'gray.700')

  return (
    <VStack spacing={4} align="start" {...rest}>
      {title && <Heading fontSize="xl">{title}</Heading>}
      {cover && (
        <Image w="full" h="382px" alt="" src={cover} borderRadius="base" />
      )}
      {!cover && <Flex w="full" h="382px" borderRadius="base" bg={bg} />}
      {body && (
        <ReactMarkdown className="markdown" remarkPlugins={[gfm]}>
          {body}
        </ReactMarkdown>
      )}
    </VStack>
  )
}
