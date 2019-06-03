module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Countries-of-the-World/'
    : '/' ,
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/]
};
