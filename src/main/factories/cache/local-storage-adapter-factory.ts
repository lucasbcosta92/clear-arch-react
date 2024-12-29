import { LocalStorageAdapter } from '@/infra/cache/local-storage-adatpter'
import { type SetStorage } from '@/data/protocols/cache/set-storage'

export const makeLocalSaveAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
