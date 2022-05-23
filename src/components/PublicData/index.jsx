/* eslint-disable react/no-children-prop */
// Módulos
import { useState } from 'react'
import {
  Box,
  VStack,
  Text,
  Avatar,
  Stack,
  InputGroup,
  Input,
  InputLeftElement,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  useColorModeValue,
  chakra,
  useToast,
} from '@chakra-ui/react'
import { MdPerson, MdFingerprint } from 'react-icons/md'
import Dropzone from 'react-dropzone'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

// Diretórios
import { Card } from '../Card'
import { UploadBox } from './UploadBox'
import { AutoResizeTextarea } from '../AutoResizeTextarea'
import { setProfileById } from '../../helpers/setProfile'
import { storage } from '../../../firebaseClient'
import { identityExists } from '../../helpers/identityExists'

export const PublicData = ({ user, ...rest }) => {
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')
  const [name, setName] = useState(user.name)
  const [identity, setIdentity] = useState(user.identity)
  const [bio, setBio] = useState(user.bio)
  const [photoURL, setPhotoURL] = useState(user.photoURL)
  const [image, setImage] = useState('')
  const toast = useToast()

  const onSubmit = async e => {
    e.preventDefault()
    const exists = await identityExists(identity)

    if (name !== user.name) {
      if (name.length >= 3 && name.length <= 15)
        setProfileById(user.id, 'name', name)
      toast({
        description: 'Nome alterado com sucesso.',
        status: 'success',
      })
    }

    if (identity !== user.identity) {
      if (identity.length >= 3 && identity.length <= 15) {
        if (exists) {
          toast({
            description: 'Esse usuário já está em uso.',
            status: 'error',
          })
        } else {
          setProfileById(user.id, 'identity', identity)
          toast({
            description: 'Usuário alterado com sucesso.',
            status: 'success',
          })
        }
      }
    }

    if (bio !== user.bio) {
      if (bio.length >= 1 && bio.length <= 150)
        setProfileById(user.id, 'bio', bio)
      toast({
        description: 'Bio alterada com sucesso.',
        status: 'success',
      })
    }

    if (image !== '') {
      const storageRef = ref(storage, `/user_photos/${image.name}`)
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
          setProfileById(user.id, 'photoURL', url)
          toast({
            description: 'Foto alterada com sucesso.',
            status: 'success',
          })
        }
      )
    }
  }

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
      setPhotoURL(src)
      setImage(file)
    }
  }

  return (
    <chakra.form onSubmit={onSubmit}>
      <Card as={VStack} spacing={4} align="start" {...rest}>
        <Text fontWeight="semibold">Foto</Text>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          w="full"
          alignItems={{ base: 'center', md: 'start' }}
        >
          {photoURL ? (
            <Avatar src={photoURL} size="xl" />
          ) : (
            <Avatar size="xl" />
          )}
          <Dropzone onDrop={acceptedFiles => handlePreview(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <Box w="full" {...getRootProps()}>
                <Input {...getInputProps()} />
                <UploadBox pos="absolute" left={4} bottom={4} />
              </Box>
            )}
          </Dropzone>
        </Stack>
        <FormControl>
          <FormLabel fontWeight="semibold">Nome</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdPerson color={secondaryColor} />}
            />
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              id="name"
              variant="outline"
              type="text"
              placeholder="Seu nome"
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="semibold">Usuário</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdFingerprint color={secondaryColor} />}
            />
            <Input
              value={identity}
              onChange={e => setIdentity(e.target.value)}
              id="identity"
              variant="outline"
              type="text"
              placeholder="Seu usuário"
            />
          </InputGroup>
          <FormHelperText>
            Insira um usuário que não esteja em uso
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="semibold">Bio</FormLabel>
          <AutoResizeTextarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Sua bio"
          />
        </FormControl>
        <Button type="submit" variant="brand">
          Salvar
        </Button>
      </Card>
    </chakra.form>
  )
}
