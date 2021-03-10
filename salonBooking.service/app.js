var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//<------------ The DB & Dotenv ------------->
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//<------------ The routes ------------->
var indexRouter = require("./routes/appointment");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var appointmentRouter = require("./routes/appointment");
//----------------------------------------

var app = express();
//----------------------------------------
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//<------------ Middlewares ------------->
app.use(express.json());
//<------------ Using The routes Middlewares ------------->
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/appointment", appointmentRouter);

//---------------------------------------------
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//---------------------------------------------
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
//---------------------------------------------

//<------------ Connect to DB  ------------->
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => console.log("Connected To DB!")
);
//--------------------------------------------
//<------------ Middlewares ------------->
app.use(express.json());

module.exports = app;
