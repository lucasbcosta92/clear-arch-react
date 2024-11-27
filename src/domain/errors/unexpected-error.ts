export class UnexpectedError extends Error {
  constructor () {
    super('An unexpected error has occurred. Try again later')
    this.name = 'UnexpectedError'
  }
}
