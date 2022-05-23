// Módulos
import Image from 'next/image'
import { Center } from '@chakra-ui/react'

// Diretórios
import { Layout } from '../components/Layout'

export default function Error404() {
  return (
    <Layout>
      <Center h="calc(100vh - 5.5rem)">
        <Image
          src="/images/404.svg"
          alt="404"
          width="768px"
          height="768px"
        ></Image>
      </Center>
    </Layout>
  )
}
