import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

export function useThemeData() {
  return useContext(ThemeContext)  
}