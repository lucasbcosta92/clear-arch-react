import React from 'react'
import { faker } from '@faker-js/faker'
import { render, fireEvent, type RenderResult } from '@testing-library/react'

import Context from '@/presentation/contexts/form/form-context'
import Input from './input'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('Should focus input on label click', () => {
    const fieldName = faker.database.column()

    const sut = makeSut(fieldName)

    const input = sut.getByTestId(fieldName)
    const label = sut.getByTestId(`${fieldName}-label`)

    fireEvent.click(label)
    expect(document.activeElement).toBe(input)
  })
})
