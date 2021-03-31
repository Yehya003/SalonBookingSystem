var express = require("express");
var router = express.Router();
//const router = require("express").Router();
//--------------------------------------------
const User = require("../model/User");
const {
  registerValidation,
  loginValidation,
} = require("../utilities/validation");
const bcrypt = require("bcryptjs");
const app = require("../app");
const jwt = require("jsonwebtoken");
//---------------------------------------------

router.get("/register", (req, res) => {
  res.send("YOU ARE IN -----> UUTH");
});

router.post("/register", async (req, res) => {
  try {
    // Validating the data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body);

    // Check if the user in the datbase not to register 2wice with the same email

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res
        .status(400)
        .send("E-mail Already exists! Try with a different E-mail!");

    console.log("-----BEFORE SALT---");

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // creating the user
    console.log("-----AFTER SALT---");

    const user = new User({
      // DATA TO SUBMIT HERE
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, //req.body.password, //hashedPassword
      appointment: req.body.appointment,
      isAdmin: req.body.isAdmin,
    });
    console.log("-----AFTER USER CREATION---");
    const savedUser = await user
      .save()
      .then(() => console.log("USER IS SAVED IN DB!!!!"));
    let admin = user.isAdmin;
    console.log("THE admin: " + user.isAdmin);
    //res.status(200).send({ user: user._id });
    let payload = { subject: user._id };
    let token = jwt.sign(payload, process.env.TOKEN_SECRET);
    console.log(token);
    res.status(200).send({ token, admin });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("Log in attempt from ")
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log('----- Login attempt from IP: '+req.ip+' for ' + req.originalUrl+'------');

    // Check if the user in the datbase
    const theUser = await User.findOne({ email: req.body.email });
    if (!theUser) {
      console.log("THE EMAIL IS NOT FOUND!");
      return res.status(400).send("E-mail is not registered!");
    }else{
       console.log("THE EMAIL IS FOUND!");
    }
        
    // Check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      theUser.password
    );

    if (!validPassword) {
      return res.status(400).send("Invalid password!").message;
    } else {
      console.log("PASSWORD IS VALIDATED!");
      let admin = theUser.isAdmin;
      console.log(admin);
      // Create and assign a token
      let payload = { _id: theUser._id };
      let token = jwt.sign(payload, process.env.TOKEN_SECRET);
      res.status(200).send({ token, admin });
    }
  } catch (err) {
    res.status(400).send(err);
  }
  /*
  const token = jwt.sign({ _id: theUser._id }, process.env.TOKEN_SECRET, {
    algorithm: "RS256",
    expiresIn: 120,
    subject: theUser._id,
  });
  res.status(200).send({token});

  res.status(200).json({
    idToken: token,
    expiresIn: 120,
  }).send();
  //res.header("token", token);
  // res.status(200).header("token", token).send(token);
  //res.status(200).send().message;
*/
});

module.exports = router;
