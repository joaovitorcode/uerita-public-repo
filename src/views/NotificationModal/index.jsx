// Módulo
import { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  // Button,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import _ from 'lodash'

// Diretórios
import { Item } from './Item'
import { getPostsNotification } from '../../helpers/getPostsNotification'
import { useAuth } from '../../hooks/useAuth'

export const NotificationModal = ({ isOpen, onClose }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const modalFull = useBreakpointValue({ base: 'full', md: 'xl' })
  const { currentUserData } = useAuth()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (_.isEmpty(currentUserData)) return null

    setPosts(
      getPostsNotification(currentUserData.following, currentUserData.id)
    )
  }, [currentUserData])

  return (
    <Modal
      scrollBehavior="inside"
      size={modalFull}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent
        bg={bg}
        p={{ base: 'none', md: 4 }}
        borderRadius={{ base: 'none', md: 'lg' }}
      >
        <ModalHeader px={4} pos="relative">
          Notificações
          {/* <Button variant="link" ml={4}>
            Limpar tudo
          </Button> */}
          <ModalCloseButton
            borderRadius="full"
            pos="absolute"
            top={4}
            right={4}
          />
        </ModalHeader>
        <ModalBody p={0}>
          {posts.map(post => (
            <Item key={post.id} post={post} />
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
