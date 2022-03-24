import Link from 'next/link'

type MenuItemProps = {
  url?: string
  text: string
  icon: JSX.Element
  onClick?: () => void
  className?: string
}

export function MenuItem(props: MenuItemProps) {
  function renderMenuItem() {
    return (
      <a className={`
        flex flex-col w-20 h-20 justify-center items-center
        text-gray-600 ${props.className}
      `}>
        {props.icon}
        <span className={`text-sm font-light `}>{props.text}</span>
      </a>
    )
  }

  return (
    <li onClick={props.onClick} className={`hover:bg-gray-100 cursor-pointer`}>
      { props.url ? (
        <Link href={props.url}>
          {renderMenuItem()}
        </Link>
      ) :
        renderMenuItem()
      }
    </li>
  )
}