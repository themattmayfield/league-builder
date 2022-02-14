import { getCsrfToken, signIn, getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import superagent from 'superagent'
import { toast } from 'react-toastify'
import { AuthLayout } from 'components/AuthUtils'
import { useRouter } from 'next/router'

const MINIMUM_ACTIVITY_TIMEOUT = 850
type LoginFormValues = {
  csrfToken: string
  email: string
  password: string
  leagueName: string
  firstName: string
  lastName: string
}

export default function AdminSetup({ csrfToken }: any) {
  const router = useRouter()
  const [isSubmitting, setSubmitting] = React.useState(false)

  const { register, handleSubmit } = useForm<LoginFormValues>()

  const createAdminAccountHandler = async (data: LoginFormValues) => {
    try {
      const response = await superagent.post('/api/auth/administrator/create').send({
        ...data
      })

      const { body } = response

      if (body.statusCode == 500) {
        throw new Error(body.message)
      }

      return body
    } catch (error: any) {
      toast['error'](error.message, {
        position: 'top-right',
        closeButton: false,
        autoClose: 1000
      })
    }
  }
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setSubmitting(true)

    try {
      const response = await createAdminAccountHandler(data)

      if (response?.data) {
        await signIn('app-login', {
          redirect: false,
          callbackUrl: '/dashboard',
          email: data.email,
          password: data.password
        })
        router.push('/dashboard')
      }

      setTimeout(() => {
        setSubmitting(false)
      }, MINIMUM_ACTIVITY_TIMEOUT)
    } catch (error: any) {
      console.error(error)
      toast['error'](error.message, {
        position: 'top-right',
        closeButton: false,
        autoClose: 1000
      })
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout title='Create League'>
      <div className='mt-8'>
        <div className='mt-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <input {...register('csrfToken')} type='hidden' defaultValue={csrfToken} hidden />
            <div>
              <label htmlFor='leagueName' className='block text-sm font-medium text-gray-700'>
                League name
              </label>
              <div className='mt-1'>
                <input
                  id='leagueName'
                  type='text'
                  required
                  {...register('leagueName')}
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
                First Name
              </label>
              <div className='mt-1'>
                <input
                  id='firstName'
                  type='firstName'
                  required
                  {...register('firstName')}
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>
                Last Name
              </label>
              <div className='mt-1'>
                <input
                  id='lastName'
                  type='lastName'
                  required
                  {...register('lastName')}
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Admin email
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  type='email'
                  autoComplete='email'
                  required
                  {...register('email')}
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            <div className='space-y-1'>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  type='password'
                  autoComplete='current-password'
                  minLength={12}
                  required
                  {...register('password')}
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            {/* <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <input
                        id='remember-me'
                        name='remember-me'
                        type='checkbox'
                        className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                      />
                      <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                        Remember me
                      </label>
                    </div>

                    <div className='text-sm'>
                      <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                        Forgot your password?
                      </a>
                    </div>
                  </div> */}

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Create league
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session) {
    return { redirect: { permanent: false, destination: session?.user?.role == 'admin' ? '/admin' : '/' } }
  }

  return {
    props: { csrfToken: await getCsrfToken({ req: context.req }) }
  }
}
