/* eslint-disable react/no-children-prop */
// Módulos
import {
  InputGroup,
  InputLeftElement,
  Input,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdSearch } from 'react-icons/md'

export const Searchbar = ({ setQuery, children, ...rest }) => {
  const primaryColor = useColorModeValue('gray.800', 'white')

  return (
    <InputGroup h={8} d="flex" alignItems="center" {...rest}>
      <InputLeftElement
        h={8}
        w={8}
        pointerEvents="none"
        children={<MdSearch size="1.5rem" color={primaryColor} />}
      />
      <Input
        pl={12}
        placeholder="Pesquisar revistas e artigos"
        variant="unstyled"
        size="md"
        onChange={e => setQuery(e.target.value)}
      />
    </InputGroup>
  )
}
