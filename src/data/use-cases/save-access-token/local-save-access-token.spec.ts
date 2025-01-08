import { faker } from '@faker-js/faker'

import { LocalSaveAccessToken } from '@/data/use-cases/save-access-token/local-save-access-token'
import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()

    const accessToken = faker.string.uuid()

    await sut.save(accessToken)

    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  test('should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()

    const error = new Error()

    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(error)

    const promise = sut.save(faker.string.uuid())

    await expect(promise).rejects.toThrow(error)
  })

  test('should throw if accesstoken is falsy', async () => {
    const { sut } = makeSut()

    const promise = sut.save(undefined)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
