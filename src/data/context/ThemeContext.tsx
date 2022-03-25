import { createContext, useState } from 'react'

type Theme = 'dark' | ''

type ThemeContextProps = {
  theme?: Theme
  changeTheme?: () => void
  children?: React.ReactNode
}

const ThemeContext = createContext<ThemeContextProps>({})

export function ThemeProvider(props: ThemeContextProps) {
  const [theme, setTheme] = useState<Theme>('dark')

  function changeTheme() {
    setTheme(theme ? '' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext