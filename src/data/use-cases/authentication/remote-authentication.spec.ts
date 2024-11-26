import { RemoteAuthentication } from './remote-authentication'

import { type HttpPostClient } from 'data/protocols/http/http-post-client'

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url

        await Promise.resolve()
      }
    }

    const url = 'www.google.com'

    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
