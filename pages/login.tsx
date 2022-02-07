import { filter } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import { getSession, getCsrfToken, signIn, getProviders } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'

const MINIMUM_ACTIVITY_TIMEOUT = 850
type LoginFormValues = {
  csrfToken: string
  email: string
  password: string
}

export default function Login({ csrfToken, providers }) {
  const [isSubmitting, setSubmitting] = React.useState(false)

  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitting(true)

    try {
      signIn('app-login', {
        callbackUrl: '/',
        email: data.email,
        password: data.password
      })

      setTimeout(() => {
        setSubmitting(false)
      }, MINIMUM_ACTIVITY_TIMEOUT)
    } catch (error) {
      console.error(error)
      //   setError(error)
      setSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign up</h2>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <input name='csrfToken' {...register('csrfToken')} type='hidden' defaultValue={csrfToken} hidden />

          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email' className='sr-only'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                {...register('email')}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
              />
            </div>

            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                minLength={12}
                required
                {...register('password')}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
              } bg-black group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
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
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
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
