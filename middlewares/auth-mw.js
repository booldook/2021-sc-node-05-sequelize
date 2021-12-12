const { pool } = require("../modules/mysql-init");
const { alert } = require("../modules/util");
const createError = require("http-errors");

module.exports.isUser = (req, res, next) => {
  if (req.session && req.session.user) next();
  else res.send(alert("로그인 후 이용하세요.", "/"));
};

module.exports.isGuest = (req, res, next) => {
  if (req.session && req.session.user) res.send(alert("회원은 이용하실 수 없습니다.", "/"));
  else next();
};

module.exports.isMine = async (req, res, next) => {
  try {
    if (req.body.mode === "update" || req.body.mode === "delete") {
      let sql = "SELECT COUNT(id) as count FROM board WHERE user_id=? AND id=?";
      let [[{ count }]] = await pool.execute(sql, [req.session.user.id, req.body.id]);
      console.log(count);
      if (count) next();
      else res.send(alert("정상적인 접근이 아닙니다.", "/"));
    } else next();
  } catch (err) {
    next(createError(err));
  }
};
