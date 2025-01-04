import '@/presentation/styles/global.scss'

import React from 'react'
import * as ReactDOM from 'react-dom'

import { Router } from '@/presentation/components'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <Router
    makeSignUp={makeSignUp}
    makeLogin={makeLogin}
  />,
  document.getElementById('main')
)
