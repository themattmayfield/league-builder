import { getCsrfToken, signIn, getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import { useForm } from 'react-hook-form'
import superagent from 'superagent'

const MINIMUM_ACTIVITY_TIMEOUT = 850
type LoginFormValues = {
  csrfToken: string
  email: string
  password: string
}

export default function AdminSetup({ csrfToken }) {
  const [isSubmitting, setSubmitting] = React.useState(false)

  const { register, handleSubmit } = useForm()

  const createAdminAccountHandler = async (data: LoginFormValues) => {
    const response = await superagent.post('/api/auth/administrator/create').send({
      ...data
    })

    return response.body
  }
  const onSubmit = async (data: LoginFormValues) => {
    setSubmitting(true)

    try {
      createAdminAccountHandler(data)
        .then((response) => {
          signIn('admin-login', {
            callbackUrl: '/admin',
            email: data.email,
            password: data.password
          })
        })
        .catch((error) => {
          console.log(error)
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
    <>
      <div className='min-h-full flex'>
        <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div>
              <img
                className='h-12 w-auto'
                src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                alt='Workflow'
              />
              <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>Create league</h2>
            </div>

            <div className='mt-8'>
              <div className='mt-6'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                  <input name='csrfToken' {...register('csrfToken')} type='hidden' defaultValue={csrfToken} hidden />
                  <div>
                    <label htmlFor='leagueName' className='block text-sm font-medium text-gray-700'>
                      League name
                    </label>
                    <div className='mt-1'>
                      <input
                        id='leagueName'
                        name='leagueName'
                        type='text'
                        required
                        {...register('leagueName')}
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
                        name='email'
                        type='email'
                        autoComplete='email'
                        required
                        {...register('email')}
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
                        name='password'
                        type='password'
                        autoComplete='current-password'
                        minLength={12}
                        required
                        {...register('password')}
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Create league
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden lg:block relative w-0 flex-1'>
          <img
            className='absolute inset-0 h-full w-full object-cover'
            src='https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
            alt=''
          />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session) {
    return { redirect: { permanent: false, destination: session?.user.role == 'admin' ? '/admin' : '/' } }
  }

  return {
    props: { csrfToken: await getCsrfToken({ req: context.req }) }
  }
}
