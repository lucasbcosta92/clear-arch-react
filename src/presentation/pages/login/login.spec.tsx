import React from 'react'
import { render, type RenderResult } from '@testing-library/react'

import Login from './login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)

  return { sut }
}

describe('Login page', () => {
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
})
