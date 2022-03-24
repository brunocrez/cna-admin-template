import { Title } from './Title'

type HeaderProps = {
  title: string
  subTitle: string  
}

export function Header(props: HeaderProps) {
  return (
    <div>
      <Title title={props.title} subTitle={props.subTitle} />
    </div>
  )
}