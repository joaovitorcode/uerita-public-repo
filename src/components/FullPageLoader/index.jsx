// Módulos
import { Center, Spinner } from '@chakra-ui/react'

export const FullPageLoader = () => {
  return (
    <Center w="100vw" h="100vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="green.200"
        color="green.600"
        size="xl"
      />
    </Center>
  )
}
