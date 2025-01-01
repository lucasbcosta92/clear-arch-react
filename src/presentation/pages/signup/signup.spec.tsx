import React from 'react'
import { render, type RenderResult } from '@testing-library/react'

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

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(fieldName)
  expect(fieldStatus.title).toBe(validationError || 'OK')
  expect(fieldStatus.textContent).toBe(validationError ? '❌' : '✅')
}

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const formStatus = sut.getByTestId(fieldName)
  expect(formStatus.childElementCount).toBe(count)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe('Signup', () => {
  test('Should start with initial state', () => {
    const validationError = 'Required field'

    const { sut } = makeSut()

    testChildCount(sut, 'form-status', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'name-status', validationError)
    testStatusForField(sut, 'email-status', validationError)
    testStatusForField(sut, 'password-status', validationError)
    testStatusForField(sut, 'passwordConfirmation-status', validationError)
  })
})
