import React from 'react'
import { cleanup, render, type RenderResult } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { Helper, ValidationStub } from '@/presentation/test'
import { Signup } from '@/presentation/pages'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params: SutParams): SutTypes => {
  const validationStub = new ValidationStub()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Signup validation={validationStub} />
  )

  return { sut }
}

describe('Signup', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.lorem.sentence(3)

    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'form-status', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name-status', validationError)
    Helper.testStatusForField(sut, 'email-status', 'Required field')
    Helper.testStatusForField(sut, 'password-status', 'Required field')
    Helper.testStatusForField(sut, 'passwordConfirmation-status', 'Required field')
  })

  test('should show name error if validation fails', () => {
    const validationError = faker.lorem.sentence(3)

    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name-status', validationError)
  })
})
