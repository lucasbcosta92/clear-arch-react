import { mockAccountModel } from '@/domain/test'
import { type AccountModel } from '@/domain/models'
import { type AuthenticationParams, type Authentication } from '@/domain/use-cases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  callsCount = 0
  params: AuthenticationParams

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++

    return this.account
  }
}
