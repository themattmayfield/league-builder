export default function ErrorAuth({ error }) {
  const errorMessage = (message) => {
    switch (message) {
      case 'Invalid Admin Credentials':
        return {
          title: 'Invalid Credentials',
          header: 'Uh oh! wrong credentials.',
          subHeader: 'It looks like you entered the wrong credentials for this account.',
          buttonText: 'Go to admin sign in',
          redirect: '/admin/sign-in'
        }
      case 'Missing Details':
        return {
          title: 'Missing Details',
          header: 'Uh oh! You missed a field.',
          subHeader: `It looks like you didn't enter all the fields to create an account.`,
          buttonText: 'Go to sign up',
          redirect: '/signup'
        }
      case 'No Admin':
        return {
          title: 'No User',
          header: 'Uh oh! No user was found.',
          subHeader: `No account found with the email you entered.`,
          buttonText: 'Go to admin sign in',
          redirect: '/admin/sign-in'
        }
      case 'Unauthorized':
        return {
          title: 'Unauthorized',
          header: `Uh oh! You're not an admin.`,
          subHeader: `No account found with the email you entered.`,
          buttonText: 'Go to admin sign in',
          redirect: '/admin/sign-in'
        }
      default:
        return {
          title: '404 error',
          header: 'Uh oh! I think you’re lost.',
          subHeader: `It looks like the page you’re looking for doesn't exist.`,
          buttonText: 'Go back home',
          redirect: '/'
        }
    }
  }

  return (
    <>
      <main
        className='min-h-full bg-cover bg-top sm:bg-top'
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")'
        }}
      >
        <div className='max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48'>
          <p className='text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide'>
            {' '}
            {errorMessage(error).title}
          </p>
          <h1 className='mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl'>
            {errorMessage(error).header}
          </h1>
          <p className='mt-2 text-lg font-medium text-black text-opacity-50'>{errorMessage(error).subHeader}</p>
          <div className='mt-6'>
            <a
              href={errorMessage(error).redirect}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 bg-white bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50'
            >
              {errorMessage(error).buttonText}
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { error } = query
  console.log(error)

  return {
    props: { error }
  }
}
