const { validationResult } = require("express-validator");

// バリデーションに引っかかった場合にそのエラーを出力する処理
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // nextが実行されれば、次の処理が実行される
};
