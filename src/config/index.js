const baseUrl = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3333'
  : 'http://localhost:3333'

const winURL = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:9020/#/'
  : 'app://./index.html#/'

export {
  baseUrl,
  winURL
}
