import React from 'react'
import { render } from '@testing-library/react'

import Login from './login'

describe('Login page', () => {
  test('should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />)

    const formStatus = getByTestId('form-status')
    expect(formStatus.childElementCount).toBe(0)
  })
})
