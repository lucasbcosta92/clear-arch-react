import { mockAccountModel } from '@/domain/test'
import { type AccountModel } from '@/domain/models'
import { type AuthenticationParams, type Authentication } from '@/domain/use-cases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params

    return await Promise.resolve(this.account)
  }
}
