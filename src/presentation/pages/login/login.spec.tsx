import React from 'react'
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import Login from './login'
import { ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.lorem.sentence(3)

  const sut = render(<Login validation={validationStub} />)

  return {
    sut,
    validationStub
  }
}

describe('Login page', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const { sut, validationStub } = makeSut()

    const formStatus = sut.getByTestId('form-status')
    expect(formStatus.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('❌')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('❌')
  })

  test('should show email error if validation fails', () => {
    const { sut, validationStub } = makeSut()

    const email = faker.internet.email()

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('❌')
  })

  test('should show password error if validation fails', () => {
    const { sut, validationStub } = makeSut()

    const password = faker.internet.password()

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('❌')
  })

  test('should show email valid state if validation succeeds', () => {
    const { sut, validationStub } = makeSut()

    const email = faker.internet.email()
    validationStub.errorMessage = null

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('OK')
    expect(emailStatus.textContent).toBe('✅')
  })

  test('should show password valid state if validation succeeds', () => {
    const { sut, validationStub } = makeSut()

    const password = faker.internet.password()
    validationStub.errorMessage = null

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('OK')
    expect(passwordStatus.textContent).toBe('✅')
  })
})
