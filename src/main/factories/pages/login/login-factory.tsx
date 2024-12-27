import React from 'react'

import { Login } from '@/presentation/pages'

import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/use-cases/authentication/remote-authentication-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />
  )
}
