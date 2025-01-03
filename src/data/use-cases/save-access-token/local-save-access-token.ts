import { type SaveAccessToken } from '@/domain/use-cases'
import { type SetStorage } from '@/data/protocols/cache/set-storage'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor (private readonly setStorage: SetStorage) {}

  async save (accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}
