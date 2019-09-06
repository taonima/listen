const baseUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:3000`
  : `http://localhost:3000`;

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

export default {
  baseUrl,
  winURL
};
