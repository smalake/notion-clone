const router = require("express").Router();
const { body } = require("express-validator");
require("dotenv").config(); // .envファイルのロード

const User = require("../models/user");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");

// ユーザ新規登録API
router.post(
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
  validation.validate,
  userController.register
);

// ユーザログイン用API
router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザ名は8文字以上である必要があります"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります"),
  validation.validate,
  userController.login
);

// JWT認証用API
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
