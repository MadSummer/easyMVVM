module.exports = {
  watch: false,
  module: {
    loaders: [
      {test:/\.css$/,loader:'style!css'},
    ],
  },
  output: {
    path: __dirname,
    filename:'binding.js'
  },
}