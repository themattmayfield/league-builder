import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import { trpc } from 'utils/trpc'
import classNames from 'classnames'
import { Header } from 'components/PageUtils'
import { Container } from 'components/PageUtils'
import Table from 'components/Table'
import TableSkeleton from 'components/TableSkeleton'
import { TableDataInterface } from 'types/Table'
// import { GetServerSidePropsContext } from 'next'

const Leagues = () => {
  const router = useRouter()
  return (
    <Layout>
      <Container>
        <Header
          title='Leagues'
          subtitle='Your leagues'
          rightSlot={
            <button
              onClick={() => router.push('/newleague')}
              className='inline-block rounded-md bg-leagueBlue px-2 py-1 text-white'
            >
              Create New League
            </button>
          }
        />
        <LeagueTable />
      </Container>
    </Layout>
  )
}

Leagues.auth = true

export default Leagues

const LeagueTable = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { data, error, isLoading } = trpc.useQuery(['get-leagues', { userId: session?.user?.id as string }])

  const tableData: TableDataInterface = {
    headers: ['Name', 'Member Count'],
    rowData: data?.leagues.map((item) => ({
      Name: item.name as string,
      'Member Count': item.members as number,
      rowAction: () => router.push(`/league/${item.id}?members=${item.members}`)
    })) as Array<{
      rowAction: any
    }>
  }

  if (isLoading) {
    return <TableSkeleton tableData={tableData} />
  }

  // TODO
  if (error) {
    return <div>Something went wrong</div>
  }

  return <Table tableData={tableData} />
}

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
