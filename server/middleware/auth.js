const { User } = require("../models/User");
const auth = (req, res, next) => {
  // 인증 처리
  // 클라이언트에서 쿠키를 가져온다
  let token = req.cookie.x_auth;
  // 토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });

    req.token = token;
    req.user = user;
    next();
  });
  // 유자가 있으면 인증 true
};

module.exports = { auth };
