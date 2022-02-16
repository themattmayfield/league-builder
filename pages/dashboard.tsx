import Layout from 'components/Layout'
import { Container } from 'components/PageUtils'
// import { GetServerSidePropsContext } from 'next'

const Dashboard = () => {
  return (
    <Layout>
      <Container>hello</Container>
    </Layout>
  )
}

Dashboard.auth = true

export default Dashboard

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context)
//   console.log(session)

//   if (!session || session?.user?.role !== 'admin') {
//     return { redirect: { permanent: false, destination: '/' } }
//   }

//   return {
//     props: { session: session }
//   }
// }
