'use strict'
const path = require('path');

module.exports = {
  entry: {
    'el-form-dialog-chen': './src/libs/el-formDialog.js'
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].min.js',
    library: 'el_form_dialog_chen',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }]
  }
}
