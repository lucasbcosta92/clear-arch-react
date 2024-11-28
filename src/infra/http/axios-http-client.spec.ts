import axios from 'axios'
import { faker } from '@faker-js/faker'

import { AxiosHttpClient } from '.'
import { type HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
})

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL and verd', async () => {
    const request = mockPostRequest()

    const { url } = request

    const sut = makeSut()

    await sut.post({ url })

    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})