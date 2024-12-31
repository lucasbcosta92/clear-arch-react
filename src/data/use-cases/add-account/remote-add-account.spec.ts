import { faker } from '@faker-js/faker'

import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAddAccount } from '@/domain/test'
import { RemoteAddAccount } from '@/data/use-cases/add-account/remote-add-account'
import { type AccountModel } from '@/domain/models'
import { type AddAccountParams } from '@/domain/use-cases'
import { EmailInUseError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const defaultUrl = faker.internet.url()

const makeSut = (url: string = defaultUrl): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()

  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccoutn', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const { sut, httpPostClientSpy } = makeSut(defaultUrl)

    await sut.add(mockAddAccount())

    expect(httpPostClientSpy.url).toBe(defaultUrl)
  })

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const addAccountParams = mockAddAccount()

    await sut.add(addAccountParams)

    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })

  test('should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.add(mockAddAccount())

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })
})
