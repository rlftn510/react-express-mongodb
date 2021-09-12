const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.log(error));

app.get("/", function (req, res) {
  res.send("hello dsd");
});

app.post(`/api/users/register`, (req, res) => {
  // 회원가입 정보들을 client 에서 가져오면 database에 넣어준다
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post(`/api/users/login`, (req, res) => {
  // 요청된 이메일을 데이터베이스에서 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.josn({
        loginSuccess: false,
        message: "이메일에 해당된 정보가 없습니다",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호 틀림",
        });
      }

      // 비밀번호 까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //token을 저장한다. 쿠키, 로컬스토리지 등...
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
  // 요청된 이메일디 데이터베이스에 있다면 비밀번호 확인
  // 유저를 위한 토큰을 생성
});

app.get("/api/users/auth", auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는 auth 통과했다는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get(`/api/users/logout`, auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, error: err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`hello on port ${port}`));
