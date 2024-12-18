import React from 'react'
import { render } from '@testing-library/react'

import Login from './login'

describe('Login page', () => {
  test('should start with initial state', () => {
    const { getByTestId } = render(<Login />)

    const formStatus = getByTestId('form-status')
    expect(formStatus.childElementCount).toBe(0)

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })
})
