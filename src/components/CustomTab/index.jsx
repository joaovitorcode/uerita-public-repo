/* eslint-disable react/display-name */
import { forwardRef } from 'react'
import {
  useColorModeValue,
  useTab,
  useMultiStyleConfig,
  Button,
} from '@chakra-ui/react'

export const CustomTab = forwardRef((props, ref) => {
  const bg = useColorModeValue('white', 'gray.800')
  const bgHover = useColorModeValue('green.50', 'gray.700')
  const color = useColorModeValue('green.600', 'green.300')

  // 1. Reuse the `useTab` hook
  const tabProps = useTab({ ...props, ref })

  // 2. Hook into the Tabs `size`, `variant`, props
  const styles = useMultiStyleConfig('Tabs', tabProps)

  return (
    <Button
      w="full"
      h={12}
      bg={bg}
      _hover={{ bg: bgHover }}
      _selected={{ color: color }}
      fontWeight="semibold"
      py={3}
      d="flex"
      justifyContent="center"
      border={0}
      __css={styles.tab}
      {...tabProps}
    >
      {tabProps.children}
    </Button>
  )
})

/*

Modo de uso

<Tabs>
  <TabList shadow="md" borderRadius="lg">

    <CustomTab borderLeftRadius="lg">
      <Icon as={icon1} w={6} h={6} mr={1} />
      Tab 1
    </CustomTab>

    <CustomTab borderRightRadius="lg">
      <Icon as={icon2} w={6} h={6} mr={1} />
      Tab 2
    </CustomTab>

  </TabList>

  <TabPanels>
    <TabPanel>1</TabPanel>
    <TabPanel>2</TabPanel>
  </TabPanels>
</Tabs>

*/
