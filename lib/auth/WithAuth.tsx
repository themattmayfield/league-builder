import { useSession, signIn } from 'next-auth/react'
import React, { useEffect, FC } from 'react'
import router from 'next/router'
import Loader from 'components/Loader'
import type { AuthenticatedPage } from 'lib/types'

interface Props {
  options: AuthenticatedPage
}

const WithAuth: React.FC<Props> = ({ children, options }) => {
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  useEffect(() => {
    console.log('here')

    // Do nothing while loading
    if (status === 'loading') {
      return
    }

    // If not authenticated, redirect to provided url or
    if (!isUser) {
      if (options?.redirectTo) {
        router.push(options.redirectTo)
      } else {
        signIn()
      }
    }
  }, [isUser, status])

  if (isUser) {
    return <>{children}</>
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div className='flex h-screen w-screen flex-col content-center items-center justify-center'>
      <Loader className='h-6 w-6' />
    </div>
  )
}

export default WithAuth
