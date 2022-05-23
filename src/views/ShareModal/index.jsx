// Módulos
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  VStack,
  ModalCloseButton,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTelegramPlane,
  FaLinkedin,
  FaLink,
} from 'react-icons/fa'

export const ShareModal = ({ postId, isOpen, onClose }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const modalFull = useBreakpointValue({ base: 'full', md: 'sm' })

  return (
    <Modal
      scrollBehavior="inside"
      isCentered
      size={modalFull}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent bg={bg} p={4} borderRadius={{ base: 'none', md: 'lg' }}>
        <ModalHeader pos="relative" px={4}>
          Compartilhar
          <ModalCloseButton
            borderRadius="full"
            pos="absolute"
            top="16px"
            right="16px"
          />
        </ModalHeader>
        <ModalBody p={0}>
          <VStack spacing={1} m={1}>
            <Button
              w="full"
              variant="ghost"
              borderRadius="none"
              justifyContent="flex-start"
              leftIcon={<FaFacebook size="1.25rem" color="#1877f2" />}
            >
              Compartilhar para Facebook
            </Button>
            <Button
              w="full"
              variant="ghost"
              borderRadius="none"
              justifyContent="flex-start"
              leftIcon={<FaTwitter size="1.25rem" color="#00aced" />}
            >
              Compartilhar para Twitter
            </Button>
            <Button
              w="full"
              variant="ghost"
              borderRadius="none"
              justifyContent="flex-start"
              leftIcon={<FaWhatsapp size="1.25rem" color="#34af23" />}
            >
              Compartilhar para Whatsapp
            </Button>
            <Button
              w="full"
              variant="ghost"
              borderRadius="none"
              justifyContent="flex-start"
              leftIcon={<FaTelegramPlane size="1.25rem" color="#0088cc" />}
            >
              Compartilhar para Telegram
            </Button>
            <Button
              w="full"
              variant="ghost"
              borderRadius="none"
              justifyContent="flex-start"
              leftIcon={<FaLinkedin size="1.25rem" color="#007bb6" />}
            >
              Compartilhar para Linkedin
            </Button>
            <Button
              w="full"
              variant="ghost"
              borderRadius="none"
              justifyContent="flex-start"
              leftIcon={<FaLink size="1.25rem" color="#09C385" />}
            >
              Copiar link: {postId}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
