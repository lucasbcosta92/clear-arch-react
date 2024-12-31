import { type AccountModel } from '@/domain/models'
import { type AddAccountParams, type AddAccount } from '@/domain/use-cases'
import { type HttpPostClient } from '@/data/protocols/http'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    return null
  }
}
