import './signup-styles.scss'

import React from 'react'
import { Link } from 'react-router-dom'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const Signup: React.FC = () => {
  return (
    <div className='signup'>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
        <form className='form' >
          <h2>Criar conta</h2>
          <Input type="text" name='name' placeholder='Digite seu nome' />
          <Input type="email" name='email' placeholder='Digite seu e-mail' />
          <Input type="password" name='password' placeholder='Digite sua senha' />
          <Input type="password" name='passwordConfirmation' placeholder='Repita sua senha' />
          <button className='submit' type="submit">Entrar</button>
          <Link to="/login" className='link'>Voltar para login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
