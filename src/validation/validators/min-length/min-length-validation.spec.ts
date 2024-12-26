import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'

const makeSute = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const sut = makeSute()

    const error = sut.validate('123')

    expect(error).toEqual(new InvalidFieldError())
  })
})
