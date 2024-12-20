import axios from 'axios'

import { type HttpResponse, type HttpPostParams, type HttpPostClient } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body)

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
