import './login-styles.scss'

import React, { useState } from 'react'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

type StateProps = {
  errorMessage: string
  isLoading: boolean
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    errorMessage: '',
    isLoading: false
  })

  return (
    <div className='login'>
      <LoginHeader />
      <Context.Provider value={state}>
        <form className='form'>
          <h2>Login</h2>
          <Input type="email" name='email' placeholder='Digite seu e-mail' />
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
