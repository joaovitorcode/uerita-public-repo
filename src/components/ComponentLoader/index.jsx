// Módulos
import { Center, Spinner } from '@chakra-ui/react'

// Diretórios
import { Card } from '../Card'

export const ComponentLoader = ({ ...rest }) => {
  return (
    <Card {...rest}>
      <Center w="full" h="full">
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="green.200"
          color="green.600"
          size="lg"
        />
      </Center>
    </Card>
  )
}
