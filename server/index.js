const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3300;
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
require("dotenv").config(); // .envファイルのロード

// JSONを使えるようにする
app.use(express.json());
app.use("/api/v1", require("./src/v1/routes"));

// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log("ローカルサーバ起動中・・・");
});
