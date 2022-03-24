import { Content } from './Content'
import { Header } from './Header'
import { SideMenu } from './SideMenu'

type LayoutProps = {
  title: string
  subTitle: string
  children?: React.ReactNode
}

export function Layout(props: LayoutProps) {
  return (
    <div className={`flex h-screen w-screen`}>
      <SideMenu />
      <div className={`flex flex-col bg-gray-200 w-full`}>
        <Header title={props.title} subTitle={props.subTitle} />
        <Content>
          {props.children}
        </Content>
      </div>
    </div>
  )
}