import { MoonIcon, SunIcon } from '../icons'

type ChangeThemeButtonProps = {
  theme: string
  changeTheme: () => void
}

export function ChangeThemeButton(props: ChangeThemeButtonProps) {
  function renderLightButton() {
    return (
      <div onClick={props.changeTheme} className={`
        hidden sm:flex items-center cursor-pointer
        bg-gradient-to-r from-yellow-300 to-yellow-600
        w-14 lg:w-24 h-8 p-1 rounded-full
      `}>
        <div className={`
          flex items-center justify-center w-6 h-6
          bg-white text-yellow-600 rounded-full
        `}>
          {SunIcon(4)}
        </div>
        <div className={`hidden lg:flex items-center ml-3 text-white`}>
          <span className='text-sm'>Claro</span>
        </div>
      </div>
    )
  }

  function renderDarkButton() {
    return (
      <div onClick={props.changeTheme} className={`
        hidden sm:flex items-center justify-end cursor-pointer
        bg-gradient-to-r from-gray-500 to-gray-900
        w-14 lg:w-24 h-8 p-1 rounded-full
      `}>
        <div className={`hidden lg:flex items-center mr-2 text-white`}>
          <span className='text-sm'>Escuro</span>
        </div>
        <div className={`
          flex items-center justify-center w-6 h-6
          bg-black text-yellow-300 rounded-full
        `}>
          {MoonIcon(4)}
        </div>
      </div>
    )
  }

  return props.theme === 'dark' ? renderLightButton() : renderDarkButton()
}