// Módulos
import {
  VStack,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'

// Diretórios
import { Card } from '../Card'
import { Identity } from '../Identity'
import { CustomTab } from '../CustomTab'
import { Edition } from './Edition'
import { Preview } from './Preview'
import { Help } from './Help'
import { useAuth } from '../../hooks/useAuth'

export const WritePost = ({ post }) => {
  const borderColor = useColorModeValue('blackAlpha.200', 'blackAlpha.600')
  const secondaryColor = useColorModeValue('gray.600', 'gray.300')
  const [title, setTitle] = useState(post?.title || '')
  const [cover, setCover] = useState(post?.coverURL || '')
  const [body, setBody] = useState(post?.body || '')
  const [image, setImage] = useState('')
  const toast = useToast()
  const { currentUserData } = useAuth()

  const handlePreview = e => {
    const file = e[0]
    const IMAGE_SIZE = 2000000 // 2 milhões de bytes, ou, 2MB
    if (!file.type.includes('image')) {
      toast({
        description: 'Insira um arquivo do tipo imagem.',
        status: 'success',
      })
    } else if (file.size > IMAGE_SIZE) {
      toast({
        description: 'A imagem deve ter no máximo 2MB de tamanho.',
        status: 'success',
      })
    } else {
      const src = URL.createObjectURL(file)
      setCover(src)
      setImage(file)
    }
  }

  return (
    <Card as={VStack} spacing={4} align="start">
      <Identity user={currentUserData} />
      <Tabs w="full">
        <TabList
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="base"
          h="3.125rem"
        >
          <CustomTab
            borderLeftRadius="base"
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="regular"
            color={secondaryColor}
          >
            Edição
          </CustomTab>
          <CustomTab
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="regular"
            color={secondaryColor}
          >
            Visualização
          </CustomTab>
          <CustomTab
            fontSize={{ base: 'sm', md: 'md' }}
            borderRightRadius="base"
            fontWeight="regular"
            color={secondaryColor}
          >
            Ajuda
          </CustomTab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <Edition
              body={body}
              setBody={setBody}
              title={title}
              setTitle={setTitle}
              handlePreview={handlePreview}
              cover={cover}
              image={image}
              postId={post?.id}
              mt={4}
            />
          </TabPanel>
          <TabPanel p={0}>
            <Preview title={title} cover={cover} body={body} mt={4} />
          </TabPanel>
          <TabPanel p={0}>
            <Help mt={4} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  )
}
