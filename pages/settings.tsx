import Layout from 'components/Layout'
// import { useState, useEffect, forwardRef } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { FaInfinity } from 'react-icons/fa'
import { useSession, signOut } from 'next-auth/react'
import { trpc } from 'utils/trpc'
import { getBaseUrl } from 'lib/helper'
import { FC } from 'react'

type SettingsProps = {
  title: string
  info: string
}

export default function Settings() {
  console.log(getBaseUrl())
  const { data: session, status } = useSession()
  const { data: userData, error, isLoading } = trpc.useQuery(['get-user', { userId: session?.user?.id as string }])

  const router = useRouter()

  return (
    <Layout>
      <div className='mb-6 mt-4 px-4'>
        <p className='mb-0.5 text-left text-3xl font-bold sm:text-center'>{userData?.user?.firstName}</p>
        <p className='text-left text-base sm:text-center'>{userData?.user?.email}</p>
      </div>

      <div className='mx-auto w-full max-w-[650px] px-6'>
        <div className='mt-12 overflow-hidden border-b border-gray-200 shadow sm:rounded-lg '>
          <div className='flex items-center justify-between bg-[#F7FAFC] px-6 py-5 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
            <p>Settings</p>
            <span className='inline-block rounded bg-[#ceedff] p-0.5 font-bold text-[#153f75]'>
              {session?.user?.role == 'user' ? 'Member' : session?.user?.role}
            </span>
          </div>
          <div className='bg-white px-6 py-6 '>
            <div className='mb-6 flex items-center justify-between'>
              <Stats title='Leagues' info='Unlimited Leagues' />
              <Stats title='Tournaments' info='Unlimited Tournaments' />
              <div></div>
            </div>
            <p className='mb-8 text-base'>
              Some cool name uses Stripe to update, change, or cancel your account. You can also update card information
              and billing addresses through the secure portal.
            </p>
            <div className='flex items-center justify-end space-x-6'>
              <p onClick={() => signOut()} className='cursor-pointer text-base'>
                Log Out
              </p>
              <button
                className={`flex h-10 items-center justify-center rounded-lg bg-leagueBlue px-4 py-2 text-sm text-white shadow-sm focus:outline-none`}
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

Settings.auth = true

const Stats: FC<SettingsProps> = ({ title, info }) => (
  <div className='flex flex-col space-y-2'>
    <p className='font-medium'>{title}</p>
    <FaInfinity className='text-xl' />
    <p className='text-gray-500'>{info}</p>
  </div>
)
