// Módulos
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MdGavel, MdVerified } from 'react-icons/md'
import _ from 'lodash'

// Diretórios
import { Layout } from '../components/Layout'
import { CustomTab } from '../components/CustomTab'
import { ReportModeration } from '../components/ReportModeration'
import { VerificationModeration } from '../components/VerificationModeration'
import { PrivateRoute } from '../components/PrivateRoute'
import { FullPageLoader } from '../components/FullPageLoader'
import { getReports } from '../helpers/getReports'
import { getChecks } from '../helpers/getChecks'
import { useAuth } from '../hooks/useAuth'

export default function Moderation({ reportProps, checkProps }) {
  const borderRadius = useBreakpointValue({ base: 'none', md: 'lg' })
  const iconSize = useBreakpointValue({ base: 5, md: 6 })
  const { currentUserData } = useAuth()
  const isModerator = currentUserData?.status === 'moderador'

  if (_.isEmpty(reportProps) || _.isEmpty(checkProps)) return <FullPageLoader />
  const reports = JSON.parse(reportProps)
  const checks = JSON.parse(checkProps)

  return (
    <PrivateRoute isProtected={!isModerator}>
      <Layout>
        <Tabs>
          <TabList shadow="md" borderRadius={borderRadius}>
            <CustomTab borderLeftRadius={borderRadius}>
              <Icon as={MdGavel} w={iconSize} h={iconSize} mr={1} />
              Denúncias
            </CustomTab>
            <CustomTab borderRightRadius={borderRadius}>
              <Icon as={MdVerified} w={iconSize} h={iconSize} mr={1} />
              Verificações
            </CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              {reports.map(report => (
                <ReportModeration key={report.id} report={report} mt={4} />
              ))}
            </TabPanel>
            <TabPanel p={0}>
              {checks.map(check => (
                <VerificationModeration key={check.id} check={check} mt={4} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </PrivateRoute>
  )
}

export const getStaticProps = async () => {
  const reports = await getReports()
  const checks = await getChecks()

  return {
    props: {
      reportProps: JSON.stringify(reports) || null,
      checkProps: JSON.stringify(checks) || null,
    },
  }
}
