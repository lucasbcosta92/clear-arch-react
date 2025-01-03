import './signup-styles.scss'

import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { type AddAccount, type SaveAccessToken } from '@/domain/use-cases'
import { type Validation } from '@/presentation/protocols/validation'
import Context from '@/presentation/contexts/form/form-context'

type Props = {
  addAccount?: AddAccount
  validation?: Validation
  saveAccessToken?: SaveAccessToken
}

const Signup: React.FC<Props> = ({ addAccount, saveAccessToken, validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    emailError: '',
    name: '',
    nameError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    password: '',
    passwordError: '',
    mainError: ''
  })

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      setState({ ...state, isLoading: true })

      if (state.isLoading || state.emailError || state.nameError || state.passwordError || state.passwordConfirmationError) {
        return
      }

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      await saveAccessToken.save(account.accessToken)

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
      nameError: validation.validate('name', state.name),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.name, state.passwordConfirmation, state.password])

  return (
    <div className='signup'>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className='form' onSubmit={(event) => { void handleSubmit(event) }}>
          <h2>Criar conta</h2>
          <Input type="text" name='name' placeholder='Digite seu nome' />
          <Input type="email" name='email' placeholder='Digite seu e-mail' />
          <Input type="password" name='password' placeholder='Digite sua senha' />
          <Input type="password" name='passwordConfirmation' placeholder='Repita sua senha' />
          <button
            data-testid="submit"
            disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError}
            className='submit'
            type="submit"
          >
            Entrar
          </button>
          <Link to="/login" data-testid="login-link" className='link'>Voltar para login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
