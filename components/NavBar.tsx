import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { trpc } from 'utils/trpc'
const navItems = [
  {
    id: '0',
    label: 'dashboard',
    link: '/dashboard'
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
  const { data: userData, error, isLoading } = trpc.useQuery(['get-user', { userId: session?.user?.id as string }])
  console.log(status)

  const router = useRouter()

  return (
    <header className='z-50 w-full border-b border-gray-200 bg-white'>
      <div className='border-t-[5px] border-leagueBlue' />
      <div className='mx-auto -mb-px flex h-[60px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 2xl:px-0'>
        {/* Header: Left side */}
        <div className='flex items-center space-x-4 sm:space-x-6'>
          {/* Logo */}

          <button onClick={() => router.push('/')} className='mr-2 h-7 w-7 cursor-pointer rounded-full bg-leagueBlue' />

          {session ? (
            navItems.map((item) => (
              <button
                onClick={() => router.push(item.link)}
                key={item.id}
                className='cursor-pointer text-base font-light text-black hover:underline'
              >
                {item.label}
              </button>
            ))
          ) : (
            <button
              onClick={() => router.push('login')}
              className='cursor-pointer text-base font-light text-black hover:underline'
            >
              login
            </button>
          )}
        </div>
        {/* Header: Right side */}
        {/* Default */}

        {userData?.user?.firstName ? (
          <div className='grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-leagueBlue text-white'>
            <p className='text-xs'>{userData?.user?.firstName[0]}</p>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Header
