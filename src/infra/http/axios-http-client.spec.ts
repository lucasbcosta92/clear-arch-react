import type axios from 'axios'

import { AxiosHttpClient } from '.'

import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockPostRequest } from '@/data/test'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  test('should call axios.post with correct values', async () => {
    const request = mockPostRequest()

    const { sut, mockedAxios } = makeSut()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('should return correct response on axios.post', () => {
    const request = mockPostRequest()

    const { sut, mockedAxios } = makeSut()

    const promise = sut.post(request)

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })

  test('should return correct error on axios.post', () => {
    const request = mockPostRequest()

    const { sut, mockedAxios } = makeSut()

    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    })

    const promise = sut.post(request)

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
