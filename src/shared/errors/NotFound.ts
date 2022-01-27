import HttpError from './HttpError'

interface NotFoundErrorBody {
  entity: string
  query: any
}
export default class NotFound<T extends NotFoundErrorBody> extends HttpError<
  T
> {
  constructor(body: T, message: string) {
    super(404, body, message)
  }
}
