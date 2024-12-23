import './login-styles.scss'

import React, { useEffect, useState } from 'react'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

import { type Authentication } from '@/domain/use-cases'
import { type Validation } from '@/presentation/protocols/validation'

type Props = {
  authentication?: Authentication
  validation?: Validation
}

const Login: React.FC<Props> = ({ authentication, validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    setState({ ...state, isLoading: true })

    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  return (
    <div className='login'>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className='form' onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input title="email" type="email" name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className='submit' type="submit">Entrar</button>
          <span className='link'>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
