export default class HttpError<
  T = { code?: string; message?: string }
> extends Error {
  statusCode: number
  body: T & { message?: string }
  constructor(statusCode: number, body: T, message: string) {
    super(message)
    this.statusCode = statusCode
    this.body = body
    this.body.message = message
  }
}
