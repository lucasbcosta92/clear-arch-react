import { faker } from '@faker-js/faker'

import { CompareFieldValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (field: string, fieldToCompare: string): CompareFieldValidation => new CompareFieldValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()

    const sut = makeSut(field, fieldToCompare)

    const error = sut.validate({ [field]: faker.string.uuid(), [fieldToCompare]: faker.string.uuid() })

    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.string.uuid()
    const value = faker.string.uuid()

    const sut = makeSut(field, fieldToCompare)

    const error = sut.validate({ [field]: value, [fieldToCompare]: value })

    expect(error).toBeFalsy()
  })
})
