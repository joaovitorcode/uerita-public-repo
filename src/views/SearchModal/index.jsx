// Módulos
import { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'

// Diretórios
import { Searchbar } from './SearchBar'
import { Item } from './Item'
import { getPosts } from '../../helpers/getPosts'

export const SearchModal = ({ isOpen, onClose }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const modalFull = useBreakpointValue({ base: 'full', md: 'xl' })
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const unsub = async () => {
      setPosts(await getPosts())
    }
    return unsub()
  }, [])

  return (
    <Modal
      scrollBehavior="inside"
      size={modalFull}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent bg={bg} p={4} borderRadius={{ base: 'none', md: 'lg' }}>
        <ModalHeader p={0} pos="relative">
          <Searchbar setQuery={setQuery} />
          <ModalCloseButton
            borderRadius="full"
            pos="absolute"
            top={0}
            right={0}
          />
        </ModalHeader>
        <ModalBody p={0}>
          {query && (
            <VStack spacing={0} mt={4}>
              {posts
                .filter(post =>
                  post.title.toLowerCase().includes(query.toLowerCase())
                )
                .map(post => (
                  <Item key={post.id} post={post}>
                    {post.title}
                  </Item>
                ))}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
