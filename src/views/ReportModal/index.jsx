/* eslint-disable react/no-children-prop */
// Módulos
import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  VStack,
  Checkbox,
  Button,
  useColorModeValue,
  useBreakpointValue,
  chakra,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Diretórios
import { AutoResizeTextarea } from '../../components/AutoResizeTextarea'
import { schema } from '../../utils/schema'
import { setReports } from '../../helpers/setReports'

export const ReportModal = ({ targetUserId, isOpen, onClose }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const modalFull = useBreakpointValue({ base: 'full', md: 'xl' })
  const [checkedItems, setCheckedItems] = useState([
    false,
    false,
    false,
    false,
    false,
  ])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema.reportModal) })
  const toast = useToast()

  const onSubmit = async data => {
    let isSubmit = false
    checkedItems.forEach(item => {
      if (item === true) isSubmit = true
    })

    if (!isSubmit) return null

    try {
      await setReports(
        'waiting',
        data.note,
        data.reference,
        targetUserId.targetUserId,
        checkedItems
      )
      toast({
        description: 'Denúncia realizada com sucesso.',
        status: 'success',
      })
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
      })
    }
  }

  return (
    <Modal
      scrollBehavior="inside"
      size={modalFull}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent bg={bg} p={4} borderRadius={{ base: 'none', md: 'lg' }}>
          <ModalHeader pos="relative" px={4}>
            Denuncie uma infração
            <ModalCloseButton
              borderRadius="full"
              pos="absolute"
              top={4}
              right={4}
            />
          </ModalHeader>
          <ModalBody pt={0} pb={4} px={4}>
            <VStack spacing={4} align="start">
              <Checkbox
                onChange={e =>
                  setCheckedItems([
                    e.target.checked,
                    checkedItems[1],
                    checkedItems[2],
                    checkedItems[3],
                    checkedItems[4],
                  ])
                }
                colorScheme="green"
              >
                Regra 1: Suspendisse eget risus iaculis, vehicula nibh in.
              </Checkbox>
              <Checkbox
                onChange={e =>
                  setCheckedItems([
                    checkedItems[0],
                    e.target.checked,
                    checkedItems[2],
                    checkedItems[3],
                    checkedItems[4],
                  ])
                }
                colorScheme="green"
              >
                Regra 2: Suspendisse eget risus iaculis, vehicula nibh in.
              </Checkbox>
              <Checkbox
                onChange={e =>
                  setCheckedItems([
                    checkedItems[0],
                    checkedItems[1],
                    e.target.checked,
                    checkedItems[3],
                    checkedItems[4],
                  ])
                }
                colorScheme="green"
              >
                Regra 3: Suspendisse eget risus iaculis, vehicula nibh in.
              </Checkbox>
              <Checkbox
                onChange={e =>
                  setCheckedItems([
                    checkedItems[0],
                    checkedItems[1],
                    checkedItems[2],
                    e.target.checked,
                    checkedItems[4],
                  ])
                }
                colorScheme="green"
              >
                Regra 4: Suspendisse eget risus iaculis, vehicula nibh in.
              </Checkbox>
              <Checkbox
                onChange={e =>
                  setCheckedItems([
                    checkedItems[0],
                    checkedItems[1],
                    checkedItems[2],
                    checkedItems[3],
                    e.target.checked,
                  ])
                }
                colorScheme="green"
              >
                Regra 5: Suspendisse eget risus iaculis, vehicula nibh in.
              </Checkbox>
              <FormControl isInvalid={errors.reference}>
                <FormLabel fontWeight="semibold">Objeto da denúncia</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="https://" />
                  <Input
                    variant="outline"
                    placeholder="uerita.com/JoaoVitor/post/1"
                    {...register('reference')}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.reference?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.note}>
                <FormLabel fontWeight="semibold">
                  Descrição da denúncia
                </FormLabel>
                <InputGroup>
                  <AutoResizeTextarea
                    placeholder="Sua denúncia..."
                    {...register('note')}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.note?.message}</FormErrorMessage>
              </FormControl>
              <Button type="submit" variant="brand">
                Enviar denúncia
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </chakra.form>
    </Modal>
  )
}
