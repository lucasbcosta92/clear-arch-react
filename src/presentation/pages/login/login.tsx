import './login-styles.scss'

import React, { useState } from 'react'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const Login: React.FC = () => {
  const [errorState] = useState({
    email: 'Required field',
    password: 'Required field',
    main: ''
  })

  const [state] = useState({
    isLoading: false
  })

  return (
    <div className='login'>
      <LoginHeader />
      <Context.Provider value={{ errorState, state }}>
        <form className='form'>
          <h2>Login</h2>
          <Input title="email" type="email" name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <button data-testid="submit" disabled className='submit' type="submit">Entrar</button>
          <span className='link'>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
