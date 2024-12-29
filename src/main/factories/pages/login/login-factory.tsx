import React from 'react'

import { Login } from '@/presentation/pages'

import { makeLocalSaveAccessToken } from '../../use-cases/save-access-token/local-save-access-token-factory'
import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/use-cases/authentication/remote-authentication-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      saveAccessToken={makeLocalSaveAccessToken()}
      validation={makeLoginValidation()}
    />
  )
}
