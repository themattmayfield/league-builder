import Layout from 'components/Layout'
import { useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import type { GetServerSideProps } from 'next'

const Page: React.FC = (props) => {
  const { status, data: session } = useSession({
    required: false
  })

  console.log(status, session)
  return (
    <>
      <Layout>
        <blockquote>
          <p>This page uses the universal getSession() method in getServerSideProps().</p>

          <p>
            Using getSession() in getServerSideProps() is the recommended approach if you need to support Server Side
            Rendering with authentication.
          </p>

          <p>The advantage of Server Side Rendering is this page does not require client side JavaScript.</p>

          <p>The disadvantage of Server Side Rendering is that this page is slower to render.</p>

          <p>This page is protected using the useSession hook.</p>
          <p>Either way works.</p>
          <p>
            But in this case the session is <strong>not</strong> available on the first render.
          </p>
        </blockquote>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      data: await getSession(context)
    }
  }
}

export default Page
