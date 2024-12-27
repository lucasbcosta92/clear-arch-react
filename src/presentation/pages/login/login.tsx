import './login-styles.scss'

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

import { type Authentication } from '@/domain/use-cases'
import { type Validation } from '@/presentation/protocols/validation'

type Props = {
  authentication: Authentication
  validation: Validation
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

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }

      setState({ ...state, isLoading: true })

      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      localStorage.setItem('accessToken', account.accessToken)

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      navigate('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
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
        <form data-testid="form" className='form' onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input title="email" type="email" name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className='submit' type="submit">Entrar</button>
          <Link data-testid="signup" to="/signup" className='link'>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
