import { LocalUpdateCurrentAccount } from '@/data/use-cases/update-current-account/local-update-current-account'
import { type UpdateCurrentAccount } from '@/domain/use-cases'

import { makeLocalSaveAdapter } from '../../cache/local-storage-adapter-factory'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalSaveAdapter())
}
