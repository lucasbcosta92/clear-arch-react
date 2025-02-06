import { type AccountModel } from '@/domain/models'
import { type SetStorage } from '@/data/protocols/cache/set-storage'
import { type UpdateCurrentAccount } from '@/domain/use-cases'
import { UnexpectedError } from '@/domain/errors'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor (private readonly setStorage: SetStorage) {}

  async save (account: AccountModel): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError()
    }

    this.setStorage.set('account', JSON.stringify(account))
  }
}
