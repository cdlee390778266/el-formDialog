'use strict'
const path = require('path');

module.exports = {
  entry: {
    'el-form-dialog': './src/libs/el-formDialog.js'
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].min.js',
    library: 'el_form_dialog',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }]
  }
}
