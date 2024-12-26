import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'

import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory()

const makeSut = (params?: SutParams): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationStub = new ValidationStub()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Router navigator={history} location={history.location}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  )

  return {
    authenticationSpy,
    sut
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(fieldName)
  expect(emailStatus.title).toBe(validationError || 'OK')
  expect(emailStatus.textContent).toBe(validationError ? '❌' : '✅')
}

describe('Login page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.lorem.sentence(3)

    const { sut } = makeSut({ validationError })

    const formStatus = sut.getByTestId('form-status')
    expect(formStatus.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    simulateStatusForField(sut, 'email-status', validationError)
    simulateStatusForField(sut, 'password-status', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = faker.lorem.sentence(3)

    const { sut } = makeSut({ validationError })

    populateEmailField(sut)

    simulateStatusForField(sut, 'email-status', validationError)
  })

  test('should show password error if validation fails', () => {
    const validationError = faker.lorem.sentence(3)

    const { sut } = makeSut({ validationError })

    populatePasswordField(sut)

    simulateStatusForField(sut, 'password-status', validationError)
  })

  test('should show email valid state if validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)

    simulateStatusForField(sut, 'email-status')
  })

  test('should show password valid state if validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)

    simulateStatusForField(sut, 'password-status')
  })

  test('should enable submit button if for is valid', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form is invalid', () => {
    const validationError = faker.lorem.sentence(3)

    const { sut, authenticationSpy } = makeSut({ validationError })

    populateEmailField(sut)

    fireEvent.submit(sut.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()

    const error = new InvalidCredentialsError()

    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    simulateValidSubmit(sut)

    const formStatus = sut.getByTestId('form-status')

    await waitFor(() => formStatus)

    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)
    expect(formStatus.childElementCount).toBe(1)
  })

  test('should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut)

    const form = sut.getByTestId('form')
    await waitFor(() => form)

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
  })

  test('should go to SignUp page', async () => {
    const { sut } = makeSut()

    const signup = sut.getByTestId('signup')

    fireEvent.click(signup)

    expect(history.location.pathname).toBe('/signup')
  })
})
