import React from 'react'
// import Styles from './login-styles.scss'

import Spinner from '@/presentation/components/spinner/spinner'

const Login: React.FC = () => {
  return (
    <div className='login'>
      <header className='header'>
        <h1>Clean Arch</h1>
      </header>
      <form className='form'>
        <h2>Login</h2>
        <div className='inputWrap'>
          <input type='email' name='email' placeholder='Digite seu e-mail' />
          <span className='status'>🔴</span>
        </div>
        <div className='inputWrap'>
          <input type='password' name='password' placeholder='Digite sua senha' />
          <span className='status'>🔴</span>
        </div>
        <button className='submit' type="submit">Entrar</button>
        <span className='link'>Criar conta</span>
        <div className='errorWrap'>
          <Spinner />
          <span className='error'>Error</span>
        </div>
      </form>
      <footer className='footer' />
    </div>
  )
}

export default Login
