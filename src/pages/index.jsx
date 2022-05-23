// Módulos
import Head from 'next/head'
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MdHome, MdPeopleAlt } from 'react-icons/md'
import _ from 'lodash'

// Diretórios
import { Layout } from '../components/Layout'
import { CustomTab } from '../components/CustomTab'
import { User } from '../components/User'
import { Post } from '../components/Post'
import { FullPageLoader } from '../components/FullPageLoader'
import { getPostsTrending } from '../helpers/getPostsTrending'
import { getUsers } from '../helpers/getUsers'

export default function Home({ postProps, userProps }) {
  const borderRadius = useBreakpointValue({ base: 'none', md: 'lg' })
  const iconSize = useBreakpointValue({ base: 5, md: 6 })

  if (_.isEmpty(postProps) || _.isEmpty(userProps)) return <FullPageLoader />
  const posts = JSON.parse(postProps)
  const users = JSON.parse(userProps)

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Tabs>
          <TabList shadow="md" borderRadius={borderRadius}>
            <CustomTab borderLeftRadius={borderRadius}>
              <Icon as={MdHome} w={iconSize} h={iconSize} mr={1} />
              Tendências
            </CustomTab>
            <CustomTab borderRightRadius={borderRadius}>
              <Icon as={MdPeopleAlt} w={iconSize} h={iconSize} mr={1} />
              Seguindo
            </CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              {posts.map(post => (
                <Post key={post.id} post={post} mt={4} />
              ))}
            </TabPanel>
            <TabPanel p={0}>
              {users.map(user => (
                <User key={user.id} user={user} mt={4} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </div>
  )
}

export const getStaticProps = async () => {
  const posts = await getPostsTrending()
  const users = await getUsers()
  const filter = []

  posts.forEach(post => {
    users.forEach(user => {
      if (post.authorId === user.id) {
        filter.push({
          authorInfos: { ...user },
          ...post,
        })
      }
    })
  })

  return {
    props: {
      postProps: JSON.stringify(filter) || null,
      userProps: JSON.stringify(users) || null,
    },
    revalidate: 1,
  }
}