const express = require("express");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("./src/v1/models/user");
const app = express();
const PORT = 3000;
require("dotenv").config(); // .envファイルのロード

// JSONを使えるようにする
app.use(express.json());

// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中");
} catch (error) {
  console.log(error);
}

// ユーザ新規登録API
app.post(
  "/register",
  // バリデーション処理
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザ名は8文字以上である必要があります"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザはすでに使われています");
      }
    });
  }),
  // バリデーションに引っかかった場合にそのエラーを出力する処理
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // nextが実行されれば、次の処理が実行される
  },
  async (req, res) => {
    // パスワードの受け取り
    const password = req.body.password;

    try {
      // パスワードの暗号化
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      );

      // ユーザの新規作成
      const user = await User.create(req.body);

      // JWTの発行
      const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// ユーザログイン用API

app.listen(PORT, () => {
  console.log("ローカルサーバ起動中・・・");
});
