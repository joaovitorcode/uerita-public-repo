// Módulos
import Head from 'next/head'
import _ from 'lodash'

// Diretórios
import { Layout } from '../../../../components/Layout'
import { WritePost } from '../../../../components/WritePost'
import { getPostById } from '../../../../helpers/getPostById'
import { PrivateRoute } from '../../../../components/PrivateRoute'
import { FullPageLoader } from '../../../../components/FullPageLoader'
import { useAuth } from '../../../../hooks/useAuth'

export default function EditPostPage({ postProps }) {
  const { currentUser } = useAuth()
  if (_.isEmpty(postProps)) return <FullPageLoader />
  const post = JSON.parse(postProps)

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PrivateRoute isProtected={currentUser?.uid !== post.authorId}>
        <Layout>
          <WritePost post={post} />
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

export const getStaticProps = async context => {
  const postId = context.params.postId
  const post = await getPostById(postId)

  return {
    props: {
      postProps: JSON.stringify(post) || null,
    },
  }
}
