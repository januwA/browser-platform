const path = require("path");

module.exports = {
  mode: "production",

  entry: {
    index: path.resolve(__dirname, "src/index.ts"),
  },

  output: {
    path: path.resolve(__dirname, "dist/umd"),
    filename: `browser-platform.js`,
    library: {
      name: "BrowserPlatform",
      type: "umd",
    },
    globalObject: "this",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.types.json"),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
