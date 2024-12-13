import './login-styles.scss'

import React from 'react'

import Footer from '@/presentation/components/footer/footer'
import Header from '@/presentation/components/login-header/login-header'
import Spinner from '@/presentation/components/spinner/spinner'

const Login: React.FC = () => {
  return (
    <div className='login'>
      <Header />
      <form className='form'>
        <h2>Login</h2>
        <div className='input-wrapper'>
          <input type='email' name='email' placeholder='Digite seu e-mail' />
          <span className='status'>🔴</span>
        </div>
        <div className='input-wrapper'>
          <input type='password' name='password' placeholder='Digite sua senha' />
          <span className='status'>🔴</span>
        </div>
        <button className='submit' type="submit">Entrar</button>
        <span className='link'>Criar conta</span>
        <div className='error-wrapper'>
          <Spinner />
          <span className='error'>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
