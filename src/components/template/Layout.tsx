import { useContext } from 'react'
import ThemeContext from '../../data/context/ThemeContext'

// components
import { Content } from './Content'
import { Header } from './Header'
import { SideMenu } from './SideMenu'
import { ForceAuth } from '../auth/ForceAuth'

type LayoutProps = {
  title: string
  subTitle: string
  children?: React.ReactNode
}

export function Layout(props: LayoutProps) {
  const { theme } = useContext(ThemeContext)
  return (
    <ForceAuth>
      <div className={`${theme} flex h-screen w-screen`}>
        <SideMenu />
        <div className={`flex flex-col bg-gray-200 w-full p-7 dark:bg-gray-800`}>
          <Header title={props.title} subTitle={props.subTitle} />
          <Content>
            {props.children}
          </Content>
        </div>
      </div>
    </ForceAuth>
  )
}