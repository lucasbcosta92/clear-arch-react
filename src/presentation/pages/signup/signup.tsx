import './signup-styles.scss'

import React, { useEffect, useState } from 'react'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { type Validation } from '@/presentation/protocols/validation'
import Context from '@/presentation/contexts/form/form-context'

type Props = {
  validation?: Validation
}

const Signup: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    emailError: '',
    name: '',
    nameError: '',
    passwordConfirmationError: 'Required field',
    passwordError: 'Required field',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      nameError: validation.validate('name', state.name)
    })
  }, [state.email, state.name])

  return (
    <div className='signup'>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className='form' >
          <h2>Criar conta</h2>
          <Input type="text" name='name' placeholder='Digite seu nome' />
          <Input type="email" name='email' placeholder='Digite seu e-mail' />
          <Input type="password" name='password' placeholder='Digite sua senha' />
          <Input type="password" name='passwordConfirmation' placeholder='Repita sua senha' />
          <button data-testid="submit" disabled className='submit' type="submit">Entrar</button>
          <span className='link'>Voltar para login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
