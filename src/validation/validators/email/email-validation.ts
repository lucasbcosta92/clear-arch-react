import { InvalidFieldError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols/field-validation'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): InvalidFieldError {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    const value = input[this.field] as string

    return (!value || emailRegex.test(value)) ? null : new InvalidFieldError()
  }
}
