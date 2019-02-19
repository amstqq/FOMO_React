var webpack = require("webpack");
var path = require("path");
require("dotenv").config({ path: "./.env" });

module.exports = {
  entry: "./client/src/index.js",
  output: {
    path: path.resolve(__dirname, "client", "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(process.env.API_KEY)
    })
  ]
};
