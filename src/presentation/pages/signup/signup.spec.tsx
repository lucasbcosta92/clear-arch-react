import React from 'react'
import { render, type RenderResult } from '@testing-library/react'

import { Helper } from '@/presentation/test'
import { Signup } from '@/presentation/pages'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <Signup />
  )

  return { sut }
}

describe('Signup', () => {
  test('Should start with initial state', () => {
    const validationError = 'Required field'

    const { sut } = makeSut()

    Helper.testChildCount(sut, 'form-status', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name-status', validationError)
    Helper.testStatusForField(sut, 'email-status', validationError)
    Helper.testStatusForField(sut, 'password-status', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation-status', validationError)
  })
})
