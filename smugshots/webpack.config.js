const path = require("path");

//import "./javascript/app";
//import "./styles/app.css";

module.exports = {
  entry: "./routes/index.js",
  output: {
    path: path.join(__dirname, "/public/dist"),
    publicPath: "/public/dist",
    filename: "main.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};