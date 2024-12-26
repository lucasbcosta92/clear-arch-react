import { EmailValidation } from '@/validation/validators/email/email-validation'
import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

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
})
