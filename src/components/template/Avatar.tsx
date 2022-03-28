import Link from 'next/link'

import { useAuth } from '../../data/hook/useAuth'

export function Avatar() {
  const { user } = useAuth()
  return (
    <Link href='/profile'>
      <img
        src={user?.image_url ?? '/images/avatar.svg'}
        alt="User Avatar"
        className='w-10 h-10 rounded-full cursor-pointer ml-3'
      />
    </Link>
  )
}