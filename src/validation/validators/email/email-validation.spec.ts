import { faker } from '@faker-js/faker'

import { EmailValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

const makeSute = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const field = faker.database.column()

    const sut = makeSute(field)

    const error = sut.validate({ [field]: faker.string.uuid() })

    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if email is valid', () => {
    const field = faker.database.column()

    const sut = makeSute(field)

    const error = sut.validate({ [field]: faker.internet.email() })

    expect(error).toBeFalsy()
  })

  test('should return falsy if email is empty', () => {
    const field = faker.database.column()

    const sut = makeSute(field)

    const error = sut.validate({ [field]: '' })

    expect(error).toBeFalsy()
  })
})
