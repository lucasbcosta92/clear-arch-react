import { faker } from '@faker-js/faker'

import { RemoteAuthentication } from './remote-authentication'

import { HttpPostClientSpy } from '@/data/test/mock-http-client'

import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { mockAuthentication } from '@/domain/test/mock-authentication'
import { HttpStatusCode } from '@/data/protocols/http/http-response'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const defaultUrl = faker.internet.url()

const makeSut = (url: string = defaultUrl): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const { sut, httpPostClientSpy } = makeSut(defaultUrl)

    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(defaultUrl)
  })

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const authenticationParams = mockAuthentication()

    await sut.auth(authenticationParams)

    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('should throw InvalidCredentialsError with HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }

    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
