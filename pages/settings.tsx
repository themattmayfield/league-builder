import Layout from 'components/Layout'
import { useState, useEffect, forwardRef } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { FaInfinity } from 'react-icons/fa'
import { useSession, signOut } from 'next-auth/react'
import { trpc } from 'utils/trpc'

export default function Settings() {
  const { data: session, status } = useSession()
  const { data: userData, error, isLoading } = trpc.useQuery(['get-user', { userId: session?.user?.id }])
  const { user } = userData
  const router = useRouter()
  console.log(user)

  if (status == 'loading') {
    return <Layout>...loading</Layout>
  }

  if (status == 'unauthenticated') {
    return <Layout>unauthenticated</Layout>
  }

  return (
    <Layout>
      <div className='px-4 mb-6 mt-4'>
        <p className='text-left sm:text-center font-bold text-3xl mb-0.5'>{user?.firstName}</p>
        <p className='text-left sm:text-center text-base'>{user?.email}</p>
      </div>

      <div className='max-w-[650px] mx-auto w-full px-6'>
        <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-12 '>
          <div className='flex items-center justify-between px-6 bg-[#F7FAFC] py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            <p>Settings</p>
            <span className='inline-block rounded bg-[#ceedff] p-0.5 text-[#153f75] font-bold'>
              {session?.user?.role == 'user' ? 'Member' : session?.user?.role}
            </span>
          </div>
          <div className='px-6 py-6 bg-white '>
            <div className='flex items-center justify-between mb-6'>
              <Stats title='Leagues' info='Unlimited Leagues' />
              <Stats title='Tournaments' info='Unlimited Tournaments' />
              <div></div>
            </div>
            <p className='text-base mb-8'>
              Some cool name uses Stripe to update, change, or cancel your account. You can also update card information
              and billing addresses through the secure portal.
            </p>
            <div className='flex items-center justify-end space-x-6'>
              <p onClick={() => signOut()} className='text-base cursor-pointer'>
                Log Out
              </p>
              <button
                className={`bg-leagueBlue h-10 px-4 py-2 rounded-lg shadow-sm focus:outline-none text-white text-sm flex items-center justify-center`}
              >
                Manage Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const Stats = ({ title, info }) => (
  <div className='flex flex-col space-y-2'>
    <p className='font-medium'>{title}</p>
    <FaInfinity className='text-xl' />
    <p className='text-gray-500'>{info}</p>
  </div>
)
