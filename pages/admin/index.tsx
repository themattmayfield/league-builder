import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AdminLayout from 'components/Layout'
import { trpc } from 'utils/trpc'

function Page() {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/', '/', {})
    }
  })

  if (status === 'loading') {
    return 'Loading or not authenticated...'
  }

  return (
    <>
      <AdminLayout title='Leagues'>
        <LeagueTable />
      </AdminLayout>
    </>
  )
}

// Page.auth = true

export default Page

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context);

//   if (!session || session?.user?.role !== "admin") {
//     return { redirect: { permanent: false, destination: "/" } };
//   }

//   return {
//     props: { session: session },
//   };
// }

const LeagueTable = () => {
  const { data: session } = useSession()
  const { user } = session
  console.log(user)

  const { data, error, isLoading } = trpc.useQuery(['get-leagues', { userId: user?.id }])

  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
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
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{league.name}</td>
                      {/* <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{league?.id}</td> */}
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
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
