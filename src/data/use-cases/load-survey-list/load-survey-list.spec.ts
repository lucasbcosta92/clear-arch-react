import { faker } from '@faker-js/faker'

import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyList } from './load-survey-list'

describe('LoadSurveyList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()

    const httpGetClientSpy = new HttpGetClientSpy()

    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

    await sut.loadAll()

    expect(httpGetClientSpy.url).toBe(url)
  })
})
