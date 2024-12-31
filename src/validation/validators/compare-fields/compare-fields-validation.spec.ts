import { faker } from '@faker-js/faker'

import { CompareFieldValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (valueToCompare: string): CompareFieldValidation => new CompareFieldValidation(faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const sut = makeSut(faker.string.uuid())

    const error = sut.validate(faker.string.uuid())

    expect(error).toEqual(new InvalidFieldError())
  })
})
