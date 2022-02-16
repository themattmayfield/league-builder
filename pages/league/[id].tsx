import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import { trpc } from 'utils/trpc'
import classNames from 'classnames'
import { Container } from 'components/PageUtils'
import Table from 'components/Table'
import TableSkeleton from 'components/TableSkeleton'
import { TableDataInterface } from 'types/Table'

const Leagues = () => {
  return (
    <Layout>
      <Container>
        <LeagueMembers />
      </Container>
    </Layout>
  )
}

Leagues.auth = true

export default Leagues

const LeagueMembers = () => {
  const { data: session } = useSession()

  const { query, push } = useRouter()

  const { data, error, isLoading } = trpc.useQuery(['get-leagueMembers', { leagueId: query?.id as string }])

  const tableData: TableDataInterface = {
    headers: ['Name', 'Email', 'Created'],
    rowData: data?.members.map((member) => ({
      Name: `${member.member.firstName} ${member.member.lastName}` as string,
      Email: member.member.email as string,
      Created: member.createdAt as Date,
      rowAction: () => null
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

  return (
    <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Created
                    </th>
                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y'>
                  {data?.members?.map((member) => (
                    <tr
                      key={member.userId}
                      className={'cursor-pointer bg-white transition duration-300 ease-in-out hover:bg-gray-50'}
                    >
                      <td
                        className={classNames(
                          isLoading && 'blur',
                          'whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'
                        )}
                      >
                        {member.member.firstName} {member.member.lastName}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{member.member.email}</td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{member.createdAt}</td>

                      <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                        <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
