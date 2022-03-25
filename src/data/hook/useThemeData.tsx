import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

export function useThemeData() {
  const { theme, changeTheme } = useContext(ThemeContext)

  return { theme, changeTheme }
}