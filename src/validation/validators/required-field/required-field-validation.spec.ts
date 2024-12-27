import { faker } from '@faker-js/faker'

import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from '@/validation/validators'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = makeSut()

    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })

  test('should return falsy if field is not empty', () => {
    const sut = makeSut()

    const error = sut.validate(faker.string.uuid())

    expect(error).toBeFalsy()
  })
})
