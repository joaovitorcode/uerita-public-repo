/* eslint-disable react/no-children-prop */
// Módulos
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  VStack,
  Checkbox,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { updateReportsById } from '../../helpers/updateReportsById'

// Diretórios
import { Card } from '../Card'
import { AutoResizeTextarea } from '../AutoResizeTextarea'

export const ReportModeration = ({ report, ...rest }) => {
  const toast = useToast()

  const handleAccepted = async () => {
    try {
      await updateReportsById(report.id, 'accepted')
      toast({
        description: 'O objeto da denúncia foi punido com sucesso.',
        status: 'success',
      })
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
      })
    }
  }

  const handleRejected = async () => {
    try {
      await updateReportsById(report.id, 'rejected')
      toast({
        description: 'O objeto da denúncia foi rejeitado com sucesso.',
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
    <Card as={VStack} spacing={4} align="start" {...rest}>
      <FormControl>
        <FormLabel fontWeight="semibold">Regras infringidas</FormLabel>
        <VStack spacing={4} align="start">
          <Checkbox
            readOnly
            isChecked={report.rulesBroken[0]}
            colorScheme="green"
          >
            Regra 1: Suspendisse eget risus iaculis, vehicula nibh in.
          </Checkbox>
          <Checkbox
            readOnly
            isChecked={report.rulesBroken[1]}
            colorScheme="green"
          >
            Regra 2: Suspendisse eget risus iaculis, vehicula nibh in.
          </Checkbox>
          <Checkbox
            readOnly
            isChecked={report.rulesBroken[2]}
            colorScheme="green"
          >
            Regra 3: Suspendisse eget risus iaculis, vehicula nibh in.
          </Checkbox>
          <Checkbox
            readOnly
            isChecked={report.rulesBroken[3]}
            colorScheme="green"
          >
            Regra 4: Suspendisse eget risus iaculis, vehicula nibh in.
          </Checkbox>
          <Checkbox
            readOnly
            isChecked={report.rulesBroken[4]}
            colorScheme="green"
          >
            Regra 5: Suspendisse eget risus iaculis, vehicula nibh in.
          </Checkbox>
        </VStack>
      </FormControl>
      <FormControl>
        <FormLabel fontWeight="semibold">Objeto da denúncia</FormLabel>
        <InputGroup>
          <InputLeftAddon children="https://" />
          <Input readOnly variant="outline" value={report.reference} />
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel fontWeight="semibold">Descrição da denúncia</FormLabel>
        <InputGroup>
          <AutoResizeTextarea readOnly value={report.note} />
        </InputGroup>
      </FormControl>
      <Flex w="full">
        <Button onClick={handleAccepted} variant="destructive" mr={2}>
          Punir
        </Button>
        <Button onClick={handleRejected} variant="ghost">
          Rejeitar
        </Button>
      </Flex>
    </Card>
  )
}
