import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router'

import Loading from '../../../public/images/loading.gif'

import { useAuth } from '../../data/hook/useAuth'

// utils
import { ADMIN_TEMPLATE_AUTH } from '../../utils'

type ForceAuthProps = {
  children?: React.ReactNode
}

export function ForceAuth(props: ForceAuthProps) {
  const { isLoading, user } = useAuth()

  function renderContent() {
    return (
      <>
        <Head>
          <script dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie?.includes("${ADMIN_TEMPLATE_AUTH}")) {
                window.location.href = "/auth"
              }
            `
          }} />
        </Head>
        {props.children}
      </>
    )
  }

  function renderLoadingGIF() {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Image src={Loading} />
      </div>
    )
  }

  if (!isLoading && user?.email) {
    return renderContent()
  } else if (isLoading) {
    return renderLoadingGIF()
  } else {
    router.push('/auth')
    return null
  }
}