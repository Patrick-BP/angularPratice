const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const { DB_URL } = require("./config.json");
const studentRouter = require("./routers/studentRouter");
const userRouter = require("./routers/userRouter");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/images", express.static(path.join(__dirname, "/uploads")));
const PRIVATE_KEY = "CS569-2022-11";
function auth(req, res, next) {
  console.log(req.body);
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, PRIVATE_KEY, (error, data) => {
      if (error) {
        res.send({ success: 0, error: "Wrong Token" });
        return;
      }
      next();
    });
  } else {
    res.send({ success: 0, error: "you are not authorized" });
  }
}

app.use("/users", userRouter);
app.use("/stds", auth, studentRouter);

app.use((req, res, next) => {
  res.status(404).send({ error: "API NOT SUPPORTED" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

mongoose
  .connect(DB_URL)
  .then(() => app.listen(3000, () => console.log("server connected")))
  .catch(() => console.log("DB Error"));
