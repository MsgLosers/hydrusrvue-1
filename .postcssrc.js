module.exports = {
  plugins: {
    'postcss-preset-env': {
      // workaround for https://github.com/postcss/postcss-custom-properties/issues/150
      features: {
        'custom-properties': false
      }
    }
  }
}
