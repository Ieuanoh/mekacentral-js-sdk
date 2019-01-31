const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    libraryTarget: "umd",
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                ["@babel/plugin-transform-modules-commonjs"],
                ["transform-object-rest-spread"],
                ["@babel/syntax-dynamic-import"],
                ["transform-class-properties"],
                ["@babel/plugin-transform-runtime"]
              ]
            }
          }
        ]
      }
    ]
  }
};
