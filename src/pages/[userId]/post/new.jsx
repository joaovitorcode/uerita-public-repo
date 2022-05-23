// Módulos
import Head from 'next/head'
import _ from 'lodash'

// Diretórios
import { Layout } from '../../../components/Layout'
import { WritePost } from '../../../components/WritePost'
import { PrivateRoute } from '../../../components/PrivateRoute'
import { useAuth } from '../../../hooks/useAuth'
import { FullPageLoader } from '../../../components/FullPageLoader'

export default function NewPostPage({ userProps }) {
  const { currentUserData } = useAuth()
  if (_.isEmpty(userProps)) return <FullPageLoader />
  const user = JSON.parse(userProps)

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PrivateRoute isProtected={currentUserData.identity !== user}>
        <Layout>
          <WritePost />
        </Layout>
      </PrivateRoute>
    </div>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = context => {
  const userId = context.params.userId

  return {
    props: {
      userProps: JSON.stringify(userId) || null,
    },
  }
}