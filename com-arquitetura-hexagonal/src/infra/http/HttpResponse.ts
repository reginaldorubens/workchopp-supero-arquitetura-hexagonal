export default class HttpResponse {
  constructor (readonly body: any, readonly statusCode: number = 200) {}
}
