import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators'

const makeSute = (field: string): MinLengthValidation => new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const field = faker.database.column()

    const sut = makeSute(field)

    const error = sut.validate({ [field]: faker.string.alphanumeric(3) })

    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if value is valid', () => {
    const field = faker.database.column()

    const sut = makeSute(field)

    const error = sut.validate({ [field]: faker.string.alphanumeric(5) })

    expect(error).toBeFalsy()
  })

  test('should return falsy if field does not exist in schema', () => {
    const sut = makeSute(faker.database.column())

    const error = sut.validate({ [faker.database.column()]: faker.string.alphanumeric(5) })

    expect(error).toBeFalsy()
  })
})
