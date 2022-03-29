import { useState } from 'react'

import { InputField } from '../components/auth/InputField'

// icons
import { WarningIcon } from '../components/icons'

// hooks
import { useAuth } from '../data/hook/useAuth'

export default function Auth() {
  const { register, login, loginGoogle } = useAuth()

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>()

  async function handleSubmit() {
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }      
    } catch (err) {
      console.error(err)
      showError(err.message)
    }
  }

  function showError(message: string, timeInSeconds = 5) {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, timeInSeconds * 1000);
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='hidden md:block md:w-1/2 lg:w-2/3'>
        <img
          src="https://source.unsplash.com/random"
          alt="Esta é uma imagem gerada automaticamente"
          className='h-screen w-full object-cover'
        />
      </div>
      <div className='m-10 w-full md:w-1/2 lg:w-1/3'>
        <h1 className={`text-3xl font-bold mb-6`}>
          { mode === 'login' ? 'Entre com Sua Conta' : 'Cadastre-se na Plataforma' }
        </h1>
        { error && (
          <div className={`
            border border-red-500 rounded-lg
            bg-red-400 p-3 flex items-center text-red-100
          `}>
            {WarningIcon()}
            <span className={`text-sm text-gray-100 ml-2`}>{error}</span>
          </div>
        )}
        <InputField
          label='E-mail'
          value={email}
          onChange={setEmail}
          type='email'
          required
        />
        <InputField
          label='Senha'
          value={password}
          onChange={setPassword}
          type='password'
          required
        />

        <button onClick={handleSubmit} className={`
          w-full bg-indigo-500 hover:bg-indigo-400
          text-white rounded-lg px-4 py-3 mt-6
        `}>
          { mode === 'login' ? 'Entrar' : 'Cadastrar' }
        </button>

        <hr className='my-6 border-gray-300 w-full' />

        <button onClick={loginGoogle} className={`
          w-full bg-red-500 hover:bg-red-400
          text-white rounded-lg px-4 py-3
        `}>
          Entrar com Google
        </button>

        { mode === 'login' ? (
          <p className='mt-8'>
            Novo Usuário?
            <a onClick={() => setMode('register')} className={`
              text-blue-500 hover:text-blue-700 cursor-pointer
              font-semibold
            `}> Cria uma Conta Gratuitamente!</a> 
          </p>
        ) : (
          <p className='mt-8'>
          Já faz parte da Comunidade?
          <a onClick={() => setMode('login')} className={`
            text-blue-500 hover:text-blue-700 cursor-pointer
            font-semibold
          `}> Faça Login na Plataforma!</a> 
        </p>
        )}
      </div>
    </div>
  )
}