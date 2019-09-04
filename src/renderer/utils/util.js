const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

export default {
  install: (Vue) => {
    Vue.winURL = winURL;
  }
};
