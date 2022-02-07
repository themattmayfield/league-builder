import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { trpc } from 'utils/trpc'
const navItems = [
  {
    id: '0',
    label: 'dashboard',
    link: '/'
  },
  {
    id: '1',
    label: 'leagues',
    link: '/leagues'
  },
  {
    id: '2',
    label: 'settings',
    link: '/settings'
  }
]

function Header() {
  const { data: session, status } = useSession()
  const { data: userData, error, isLoading } = trpc.useQuery(['get-user', { userId: session?.user?.id }])
  const { user } = userData
  const router = useRouter()

  return (
    <header className='w-full bg-white border-b border-gray-200'>
      <div className='border-t-[5px] border-leagueBlue' />
      <div className='px-8 2xl:px-0  max-w-6xl mx-auto flex items-center justify-between h-[60px] -mb-px'>
        {/* Header: Left side */}
        <div className='flex items-center space-x-4 sm:space-x-6'>
          {/* Logo */}

          <div className='w-7 h-7 mr-2 rounded-full bg-leagueBlue cursor-pointer' />

          {navItems.map((item) => (
            <button
              onClick={() => router.push(item.link)}
              key={item.id}
              className='text-base font-light hover:underline text-black cursor-pointer'
            >
              {item.label}
            </button>
          ))}
        </div>
        {/* Header: Right side */}
        {/* Default */}

        {user?.firstName ? (
          <div className='grid place-items-center w-8 h-8 rounded-full bg-leagueBlue text-white cursor-pointer'>
            <p className='text-xs'>{user.firstName[0]}</p>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Header
