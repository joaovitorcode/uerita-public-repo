// Módulos
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Icon,
  Text,
  VStack,
  Flex,
  Divider,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MdPublic, MdLock } from 'react-icons/md'
import _ from 'lodash'

// Diretórios
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'
import { CustomTab } from '../components/CustomTab'
import { PublicData } from '../components/PublicData'
import { ImportVerification } from '../components/ImportVerification'
import { PrivateData } from '../components/PrivateData'
import { DangerZone } from '../components/DangerZone'
import { PrivateRoute } from '../components/PrivateRoute'
import { useAuth } from '../hooks/useAuth'
import { FullPageLoader } from '../components/FullPageLoader'

export default function Settings() {
  const secondaryColor = useColorModeValue('#4A5568', '#CBD5E0')
  const borderRadius = useBreakpointValue({ base: 'none', md: 'lg' })
  const iconSize = useBreakpointValue({ base: 5, md: 6 })
  const { currentUser, currentUserData } = useAuth()
  if (_.isEmpty(currentUserData)) return <FullPageLoader />

  return (
    <PrivateRoute isProtected={!currentUser}>
      <Layout>
        <Tabs>
          <TabList shadow="md" borderRadius={borderRadius}>
            <CustomTab borderLeftRadius={borderRadius}>
              <Icon as={MdPublic} w={iconSize} h={iconSize} mr={1} />
              Dados públicos
            </CustomTab>
            <CustomTab borderRightRadius={borderRadius}>
              <Icon as={MdLock} w={iconSize} h={iconSize} mr={1} />
              Dados privados
            </CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <PublicData user={currentUserData} mt={4} />
              <ImportVerification
                targetUserIdentity={currentUserData.identity}
                mt={4}
              />
            </TabPanel>
            <TabPanel p={0}>
              <Card as={VStack} spacing={4} align="start" mt={4}>
                <Flex align="center">
                  <Text fontWeight="semibold" mr={4}>
                    E-mail
                  </Text>
                  <Text fontSize="sm" color={secondaryColor}>
                    {currentUser?.email}
                  </Text>
                </Flex>
                <Divider />
                <Flex align="center">
                  <Text fontWeight="semibold" mr={4}>
                    Status
                  </Text>
                  <Text fontSize="sm" color={secondaryColor}>
                    {currentUserData?.status}
                  </Text>
                </Flex>
              </Card>
              <PrivateData mt={4} />
              <DangerZone mt={4} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </PrivateRoute>
  )
}
