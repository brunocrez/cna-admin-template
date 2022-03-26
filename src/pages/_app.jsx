import '../styles/globals.css'

import { ThemeProvider } from '../data/context/ThemeContext'
import { AuthProvider } from '../data/context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )    
}

export default MyApp
