import { makeLoginValidation } from './login-validation-factory'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators'

describe('LoginValidationFactory', () => {
  test('should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()

    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().min(5).build()
    ]))
  })
})
