import type axios from 'axios'

import { AxiosHttpClient } from '.'

import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockGetRequest, mockPostRequest } from '@/data/test'

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

describe('Get', () => {
  test('should call axios.get with correct values', async () => {
    const request = mockGetRequest()

    const { sut, mockedAxios } = makeSut()

    await sut.get(request)

    expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
  })

  test('should return correct response on axios.get', async () => {
    const request = mockGetRequest()

    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.get(request)

    const axiosResponse = await mockedAxios.get.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  test('should return correct error on axios.get', () => {
    const request = mockGetRequest()

    const { sut, mockedAxios } = makeSut()

    mockedAxios.get.mockRejectedValueOnce({
      response: mockHttpResponse()
    })

    const promise = sut.get(request)

    expect(promise).toEqual(mockedAxios.get.mock.results[0].value)
  })
})

describe('Post', () => {
  test('should call axios.post with correct values', async () => {
    const request = mockPostRequest()

    const { sut, mockedAxios } = makeSut()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('should return correct response on axios.post', async () => {
    const request = mockGetRequest()

    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.post(request)

    const axiosResponse = await mockedAxios.post.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
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
