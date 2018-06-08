const path = require('path');

module.exports = {
    entry: {
        app: ['babel-polyfill',
        './public/js/app.js']
    },
    output: {
        filename: 'app.bundle.js',
        path: __dirname + '/public/build'
    },
    module: {
        rules: [
          {
            test: /\.js?$/,
            use: [
              {
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0']
                }
              }
            ]
          }
        ]
      }

}