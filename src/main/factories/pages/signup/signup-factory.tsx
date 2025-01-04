import React from 'react'

import { Signup } from '@/presentation/pages'

import { makeLocalSaveAccessToken } from '../../use-cases/save-access-token/local-save-access-token-factory'
import { makeRemoteAddAccount } from '../../use-cases/add-account/remote-add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUp: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      saveAccessToken={makeLocalSaveAccessToken()}
      validation={makeSignUpValidation()}
    />
  )
}
