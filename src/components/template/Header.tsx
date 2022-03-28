// components
import { Title } from './Title'
import { Avatar } from './Avatar'
import { ChangeThemeButton } from './ChangeThemeButton'

// hooks
import { useThemeData } from '../../data/hook/useThemeData'

type HeaderProps = {
  title: string
  subTitle: string  
}

export function Header(props: HeaderProps) {
  const { theme, changeTheme } = useThemeData()
  return (
    <div className='flex'>
      <Title title={props.title} subTitle={props.subTitle} />
      <div className='flex flex-grow justify-end items-center'>
        <ChangeThemeButton theme={theme} changeTheme={changeTheme} />
        <Avatar />
      </div>
    </div>
  )
}