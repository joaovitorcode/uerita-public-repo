// Módulos
import Head from 'next/head'
import _ from 'lodash'

// Diretórios
import { Layout } from '../../../components/Layout'
import { Comment } from '../../../components/Comment'
import { Thumbnail } from '../../../components/Thumbnail'
import { FullPageLoader } from '../../../components/FullPageLoader'
import { getCommentById } from '../../../helpers/getCommentById'

export default function CommentPage({ commentProps }) {
  if (_.isEmpty(commentProps)) return <FullPageLoader />
  const comment = JSON.parse(commentProps)

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Thumbnail comment={comment} />
        <Comment
          key={comment.id}
          comment={comment}
          shadow="md"
          borderWidth={0}
          mt={4}
        />
      </Layout>
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
  const id = context.params.commentId

  const comment = await getCommentById(id)

  return {
    props: {
      commentProps: JSON.stringify(comment) || null,
    },
    revalidate: 60,
  }
}
