const baseUrl = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3000'
  : 'http://localhost:3000'

const winURL = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:9020/#/'
  : 'app://./index.html#/'

export {
  baseUrl,
  winURL
}
