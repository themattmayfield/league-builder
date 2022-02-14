import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import { trpc } from 'utils/trpc'
import classNames from 'classnames'
import Loader from 'components/Loader'
// import { GetServerSidePropsContext } from 'next'

const Page = () => {
  // const router = useRouter()

  return (
    <Layout>
      <LeagueTable />
    </Layout>
  )
}

// Page.auth = true

Page.auth = {}

export default Page

const LeagueTable = () => {
  const { data: session } = useSession()

  console.log(session)

  const { data, error, isLoading } = trpc.useQuery(['get-leagues', { userId: session?.user?.id as string }])

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
                    {/* <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Role
                    </th> */}
                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.leagues?.map((league, leagueIdx) => (
                    <tr key={league.id} className={leagueIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td
                        className={classNames(
                          isLoading && 'blur',
                          'whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'
                        )}
                      >
                        {isLoading ? 'bgtyuobvuowa' : league.name}
                      </td>
                      {/* <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{league?.id}</td> */}
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
