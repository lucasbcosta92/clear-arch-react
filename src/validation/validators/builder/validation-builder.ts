import { CompareFieldValidation, EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'
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

  min (length: number): this {
    this.validations.push(new MinLengthValidation(this.fieldName, length))

    return this
  }

  required (): this {
    this.validations.push(new RequiredFieldValidation(this.fieldName))

    return this
  }

  sameAs (fieldToCompare: string): this {
    this.validations.push(new CompareFieldValidation(this.fieldName, fieldToCompare))

    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
