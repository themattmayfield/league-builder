import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import { trpc } from 'utils/trpc'
import classNames from 'classnames'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Container, Header } from 'components/PageUtils'
import { useState } from 'react'
import { toast } from 'react-toastify'
// import { GetServerSidePropsContext } from 'next'

const MINIMUM_ACTIVITY_TIMEOUT = 850
interface LegueValues {
  name: string
  //   image?: string
}
interface Admin {
  id: string
  email: string
}

const Leagues = () => {
  const router = useRouter()
  const { data: session } = useSession()
  console.log(session)

  const [isSubmitting, setSubmitting] = useState(false)

  const { register, handleSubmit } = useForm<LegueValues>()

  const createLeague = trpc.useMutation(['create-league'])

  const onSubmit: SubmitHandler<LegueValues> = async (data) => {
    setSubmitting(true)

    try {
      createLeague.mutate({
        name: data.name,
        admin: { id: session?.user?.id as string, email: session?.user?.email as string }
      })

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
    <Layout>
      <Container>
        <Header
          title='New League'
          subtitle='This information will be displayed publicly so be careful what you share.'
        />
        <form className='space-y-8 divide-y divide-gray-200' onSubmit={handleSubmit(onSubmit)}>
          <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
                League name
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  id='name'
                  required
                  {...register('name')}
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>
          </div>

          <div className='pt-5'>
            <div className='flex justify-end'>
              <button
                onClick={() => router.push('/leagues')}
                type='button'
                className={`${
                  isSubmitting && 'disabled:opacity-50'
                } rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
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
                {isSubmitting ? 'Creating League...' : 'Create League'}
              </button>
            </div>
          </div>
        </form>
      </Container>
    </Layout>
  )
}

Leagues.auth = true

export default Leagues
