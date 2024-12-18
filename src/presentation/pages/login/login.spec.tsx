import React from 'react'
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react'

import Login from './login'
import { type Validation } from '@/presentation/protocols/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)

  return {
    sut,
    validationSpy
  }
}

describe('Login page', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const { sut } = makeSut()

    const formStatus = sut.getByTestId('form-status')
    expect(formStatus.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Required field')
    expect(emailStatus.textContent).toBe('❌')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Required field')
    expect(passwordStatus.textContent).toBe('❌')
  })

  test('should call Validation with correct value', () => {
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({ email: 'any_email' })
  })
})
