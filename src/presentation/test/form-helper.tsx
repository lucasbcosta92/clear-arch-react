import { type RenderResult } from '@testing-library/react'

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(fieldName)
  expect(fieldStatus.title).toBe(validationError || 'OK')
  expect(fieldStatus.textContent).toBe(validationError ? '❌' : '✅')
}

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const formStatus = sut.getByTestId(fieldName)
  expect(formStatus.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}
