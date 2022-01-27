import HttpError from './HttpError'

export default class BadRequest<T> extends HttpError<T> {
  constructor(body: T, message: string) {
    super(400, body, message)
  }
}
