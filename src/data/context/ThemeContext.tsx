import { createContext, useEffect, useState } from 'react'

type ThemeContextProps = {
  theme?: string
  changeTheme?: () => void
  children?: React.ReactNode
}

const ThemeContext = createContext<ThemeContextProps>({})

export function ThemeProvider(props: ThemeContextProps) {
  const [theme, setTheme] = useState('dark')

  function changeTheme() {
    const currentTheme = theme ? '' : 'dark'
    localStorage.setItem('theme', currentTheme)
    setTheme(currentTheme)
  }

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    setTheme(currentTheme)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext