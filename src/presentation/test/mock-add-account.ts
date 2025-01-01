import { mockAccountModel } from '@/domain/test'
import { type AccountModel } from '@/domain/models'
import { type AddAccountParams, type AddAccount } from '@/domain/use-cases'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccountParams

  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params

    return this.account
  }
}
