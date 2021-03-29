var express = require('express');
var router = express.Router();
const User = require("../model/User");
const verify = require("./verifyToken");
// add ,verify to method signature to make it private
/* GET users listing. */
router.get("/", verify ,async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.json({ message: error });
  }
});

// get a specific user using his id
router.get('/:userId', verify,async (req, res) => {
  try {
     const specificUser = await User.findById(req.user._id);
  res.json(specificUser);
  } catch (error) {
    res.json({message: error});
  }  
});

// delete a specific user
router.delete("/:userId", verify, async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.user._id });
    res.json(removedUser);
  } catch (error) {
    res.json({ message: error });
  }
});
 // one must send his own ID 
router.put("/:userId",verify, async (req, res) => {

  try {
    let id = req.body.userId;
    console.log("here are id: "+id);
    const update = {

      name: req.body.name,
      email: req.body.email,
    };
    console.log(id + update);

    const updatedUser = await User.updateOne({ _id: id }, update);
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/admin/:userId", verify, async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });
    res.json(removedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

// update a user name 
router.patch("/:userId/changeName", verify, async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.user._id },
      { $set: { name: req.body.name } }
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:userId/changeEmail", verify, async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.user._id },
      { $set: { email: req.body.email } }
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:userId/changePassword", verify, async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.user._id },
      { $set: { password: req.body.password } }
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
