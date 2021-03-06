var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors');
const bodyParser = require("body-parser");

//<------------ The DB & Dotenv ------------->
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//<------------ The routes ------------->
//var indexRouter = require("./routes/appointment");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var appointmentRouter = require("./routes/appointment");
//----------------------------------------

var app = express();
/*
var originsWhitelist = [
  'http://localhost:4200'    //this is my front-end url for development
];

var corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true,
};
*/

//----------------------------------------
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//<------------ Middlewares ------------->
app.use(express.json());
//<------------ Using The routes Middlewares ------------->
app.use(cors());
//app.use("/", indexRouter);
app.use("/api/users", usersRouter);
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
  { useUnifiedTopology: true , useNewUrlParser: true },//{ useNewUrlParser: true },
  () => console.log("Connected To DB!")
);
//--------------------------------------------
//<------------ Middlewares ------------->
app.use(express.json());
module.exports = app;