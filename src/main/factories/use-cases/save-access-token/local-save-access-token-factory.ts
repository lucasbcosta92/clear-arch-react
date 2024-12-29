import { LocalSaveAccessToken } from '@/data/use-cases/save-access-token/local-save-access-token'
import { type SaveAccessToken } from '@/domain/use-cases'
import { makeLocalSaveAdapter } from '../../cache/local-storage-adapter-factory'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalSaveAdapter())
}
