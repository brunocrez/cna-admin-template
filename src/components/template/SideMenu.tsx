// icons
import { HomeIcon, LogoutIcon, SettingsIcon } from '../icons'

// components
import { Logo } from './Logo'
import { MenuItem } from './MenuItem'

export function SideMenu() {
  function handleLogout() {
    console.log('LOGOUT!')
  }

  return (
    <aside className={`
      flex flex-col text-gray-700 dark:bg-gray-900
    `}>
      <div className={`
        h-20 w-20 flex flex-col justify-center items-center
        bg-gradient-to-r from-indigo-500 to-purple-700        
      `}>
        <Logo />
      </div>
      <ul className='flex-grow'>
        <MenuItem url='/' text='Home' icon={HomeIcon} />
        <MenuItem url='/settings' text='Ajustes' icon={SettingsIcon} />
      </ul>
      <ul>
        <MenuItem
          text='Sair'
          icon={LogoutIcon}
          onClick={handleLogout}
          className={`
            text-red-600 dark:text-red-400
            hover:bg-red-500 hover:text-white hover:dark:text-white
          `} />
      </ul>
    </aside>
  )
}