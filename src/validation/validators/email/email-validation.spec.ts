import { faker } from '@faker-js/faker'

import { EmailValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

const makeSute = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = makeSute()

    const error = sut.validate(faker.string.uuid())

    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if email is valid', () => {
    const sut = makeSute()

    const error = sut.validate(faker.internet.email())

    expect(error).toBeFalsy()
  })

  test('should return falsy if email is empty', () => {
    const sut = makeSute()

    const error = sut.validate('')

    expect(error).toBeFalsy()
  })
})
