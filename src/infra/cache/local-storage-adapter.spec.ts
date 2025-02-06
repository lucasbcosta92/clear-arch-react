import 'jest-localstorage-mock'
import { faker } from '@faker-js/faker'

import { LocalStorageAdapter } from '@/infra/cache/local-storage-adatpter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct values', async () => {
    const sut = makeSut()

    const key = faker.database.column()
    const value = faker.string.alphanumeric()

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
