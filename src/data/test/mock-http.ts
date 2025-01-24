import { faker } from '@faker-js/faker'

import {
  HttpStatusCode,
  type HttpGetClient,
  type HttpGetParams,
  type HttpPostClient,
  type HttpPostParams,
  type HttpResponse
} from '@/data/protocols/http'

export class HttpGetClientSpy implements HttpGetClient {
  url?: string

  async get (params: HttpGetParams): Promise<void> {
    this.url = params.url
  }
}

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body

    return this.response
  }
}

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
})
