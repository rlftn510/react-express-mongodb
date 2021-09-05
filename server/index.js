const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
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

app.post(`/register`, (req, res) => {
  // 회원가입 정보들을 client 에서 가져오면 database에 넣어준다
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.listen(port, () => console.log(`hello on port ${port}`));
