import React from 'react'

import { Signup } from '@/presentation/pages'

import { makeLocalUpdateCurrentAccount } from '../../use-cases/update-current-account/local-update-current-account-factory'
import { makeRemoteAddAccount } from '../../use-cases/add-account/remote-add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUp: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
