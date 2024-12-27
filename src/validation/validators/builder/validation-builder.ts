import { EmailValidation, RequiredFieldValidation } from '@/validation/validators'
import { type FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationBuilder {
  // prohibits instantiating with "new ValidationBuilder"...
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  email (): this {
    this.validations.push(new EmailValidation(this.fieldName))

    return this
  }

  required (): this {
    this.validations.push(new RequiredFieldValidation(this.fieldName))

    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
