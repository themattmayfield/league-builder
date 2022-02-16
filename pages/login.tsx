import { filter } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import { getSession, getCsrfToken, signIn, getProviders } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthLayout } from 'components/AuthUtils'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const MINIMUM_ACTIVITY_TIMEOUT = 850
interface LoginFormValues {
  csrfToken: string
  email: string
  password: string
}

export default function Login({ csrfToken }: any) {
  const router = useRouter()
  const [isSubmitting, setSubmitting] = useState(false)

  const { register, handleSubmit } = useForm<LoginFormValues>()

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setSubmitting(true)

    try {
      const response: any = await signIn('app-login', {
        redirect: false,
        email: data.email,
        password: data.password
      })

      if (response.error) {
        throw new Error(response.error)
      }

      router.push('/dashboard')

      setTimeout(() => {
        setSubmitting(false)
      }, MINIMUM_ACTIVITY_TIMEOUT)
    } catch (error: any) {
      toast['error'](error.message, {
        position: 'top-right',
        closeButton: false,
        autoClose: 1000
      })

      setSubmitting(false)
    }
  }

  return (
    <AuthLayout title='Login'>
      <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <input {...register('csrfToken')} type='hidden' defaultValue={csrfToken} hidden />

        <div className='-space-y-px rounded-md shadow-sm'>
          <div>
            <label htmlFor='email' className='sr-only'>
              Email address
            </label>
            <input
              id='email'
              type='email'
              autoComplete='email'
              required
              {...register('email')}
              className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              placeholder='Email address'
            />
          </div>

          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <input
              id='password'
              type='password'
              autoComplete='current-password'
              // minLength={12}
              required
              {...register('password')}
              className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              placeholder='Password'
            />
          </div>
        </div>

        <div>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`${
              isSubmitting && 'disabled:opacity-50'
            } group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
              <svg
                className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log('context:', context)

  const session = await getSession(context)
  console.log('session:', session)

  if (session) {
    return { redirect: { permanent: false, destination: '/' } }
  }

  const csrfToken = await getCsrfToken({ req: context.req })
  const providers = filter(await getProviders(), (provider) => {
    return provider.type !== 'credentials'
  })

  return {
    props: { csrfToken, providers }
  }
}
