import './login-styles.scss'

import React, { useEffect, useState } from 'react'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

import { type Validation } from '@/presentation/protocols/validation'

type Props = {
  validation?: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Required field',
    passwordError: 'Required field',
    mainError: ''
  })

  useEffect(() => {
    validation.validate({ email: state.email })
  }, [state.email])

  useEffect(() => {
    validation.validate({ password: state.password })
  }, [state.password])

  return (
    <div className='login'>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
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
