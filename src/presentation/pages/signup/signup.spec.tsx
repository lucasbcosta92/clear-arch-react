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

const makeSut = (params?: SutParams): SutTypes => {
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
    Helper.testStatusForField(sut, 'email-status', validationError)
    Helper.testStatusForField(sut, 'password-status', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation-status', validationError)
  })

  test('should show name error if validation fails', () => {
    const validationError = faker.lorem.sentence(3)

    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name-status', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = faker.lorem.sentence(3)

    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email-status', validationError)
  })

  test('should show password error if validation fails', () => {
    const validationError = faker.lorem.sentence(3)

    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password-status', validationError)
  })

  test('should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.lorem.sentence(3)

    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation-status', validationError)
  })

  test('should show name valid state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name-status')
  })

  test('should show email valid state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email-status')
  })

  test('should show password valid state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password-status')
  })

  test('should show passwordConfirmation valid state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation-status')
  })

  test('should enable submit button if for is valid', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })
})
