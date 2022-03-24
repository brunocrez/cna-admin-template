type TitleProps = {
  title: string
  subTitle: string  
}

export function Title(props: TitleProps) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subTitle}</h2>
    </div>
  )
}