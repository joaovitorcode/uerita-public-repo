// Módulos
import {
  VStack,
  Flex,
  Button,
  Spacer,
  Box,
  useColorModeValue,
  useBreakpointValue,
  chakra,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  useToast,
} from '@chakra-ui/react'
import { MdAccessTimeFilled, MdMode } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Dropzone from 'react-dropzone'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import moment from 'moment'

// Diretórios
import { AutoResizeTextarea } from '../AutoResizeTextarea'
import { Counter } from '../Counter'
import { UploadButton } from './UploadButton'
import { schema } from '../../utils/schema'
import { db, storage } from '../../../firebaseClient'
import { useAuth } from '../../hooks/useAuth'

export const Edition = ({
  body,
  cover,
  setBody,
  title,
  setTitle,
  handlePreview,
  image,
  postId,
  ...rest
}) => {
  const bg = useColorModeValue('gray.100', 'gray.700')
  const useButtonMobile = useBreakpointValue({ base: true, md: false })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.writePost),
  })
  const { currentUser } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const calculeteReadTime = () => {
    const ONE_MINUTE = 60
    const SECONDS = 200
    const wordCount = body.split(' ').length
    const readTimeInSeconds = Math.round((wordCount * ONE_MINUTE) / SECONDS)
    return readTimeInSeconds
  }
  const readTime = calculeteReadTime()

  const uploadPost = async (data, url) => {
    try {
      await addDoc(collection(db, 'posts'), {
        authorId: currentUser.uid,
        body: data.body,
        comments: [],
        coverURL: url,
        date: new Date(),
        downvotes: [],
        notificationSeen: [],
        readCounter: 0,
        readTime: readTime,
        shares: 0,
        title: data.title,
        upvotes: [],
        visibility: true,
      })
      toast({
        description: 'Artigo publicado com sucesso.',
        status: 'success',
      })
      router.push('/')
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
      })
    }
  }

  const updatePost = async (data, url) => {
    try {
      if (url) {
        await updateDoc(doc(db, 'posts', postId), {
          body: data.body,
          coverURL: url,
          title: data.title,
          readTime: readTime,
        })
      } else {
        await updateDoc(doc(db, 'posts', postId), {
          body: data.body,
          title: data.title,
          readTime: readTime,
        })
      }
      toast({
        description: 'Artigo atualizado com sucesso.',
        status: 'success',
      })
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
      })
    }
  }

  const onSubmit = data => {
    if (image === '' && !postId) {
      toast({
        description: 'Para publicar um artigo é necessário uma imagem de capa.',
        status: 'success',
      })
      return
    } else if (image === '' && postId) {
      return updatePost(data)
    }

    const storageRef = ref(storage, `/post_covers/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        console.log(prog)
      },
      error => console.log(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        postId ? updatePost(data, url) : uploadPost(data, url)
      }
    )
  }

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} {...rest}>
        <FormControl isInvalid={errors.title}>
          <AutoResizeTextarea
            value={title}
            fontSize="xl"
            fontWeight="semibold"
            variant="unstyled"
            placeholder="Escreva o título..."
            py={0}
            {...register('title')}
            onChange={e => setTitle(e.target.value)}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <Box w="full" pos="relative">
          {cover && (
            <Image
              src={cover}
              alt="capa do artigo"
              objectFit="cover"
              borderRadius="base"
            />
          )}
          {!cover && <Flex w="full" h="382px" borderRadius="base" bg={bg} />}

          <Dropzone onDrop={acceptedFiles => handlePreview(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <Box {...getRootProps()}>
                <Input {...getInputProps()} />
                <UploadButton pos="absolute" left={4} bottom={4} />
              </Box>
            )}
          </Dropzone>
        </Box>
        <FormControl isInvalid={errors.body}>
          <AutoResizeTextarea
            value={body}
            fontSize="md"
            variant="unstyled"
            placeholder="Escreva o conteúdo..."
            py={0}
            {...register('body')}
            onChange={e => setBody(e.target.value)}
          />
          <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
        </FormControl>
        <Flex w="full" align="center">
          <Counter
            icon={MdAccessTimeFilled}
            visuallyHidden="Tempo de leitura"
            mr={4}
          >
            {moment.utc(readTime * 1000).format('mm:ss')}
          </Counter>
          <Counter icon={MdMode} mr={4} visuallyHidden="Mínimo de caracteres">
            mín. {body.length}/1
          </Counter>
          <Counter icon={MdMode} visuallyHidden="Máximo de caracteres">
            máx. {body.length}/10.000
          </Counter>
          <Spacer />
          {!useButtonMobile && (
            <Button type="submit" variant="brand" size="sm">
              Publicar
            </Button>
          )}
        </Flex>
        {useButtonMobile && (
          <Button isFullWidth type="submit" variant="brand" size="sm">
            Publicar
          </Button>
        )}
      </VStack>
    </chakra.form>
  )
}
