var express = require("express");
var router = express.Router();
const User = require("../model/User");
const verify = require("./verifyToken");


// ------------------CUSTOMER METHODS-----------------------
router.post("/:userId", async (req, res) => {
  try {
    var theAppointment = {
      appointmentDate: req.body.appointmentDate,
      name: req.body.name,
      email: req.body.email,
    };
    const createdAppointment = await User.updateOne(
      { _id: req.params._userId },
      { $push: { appointment: theAppointment } }
    );
    res.json(createdAppointment);
  } catch (error) {
    res.json({ message: error });
  }
}); 

// ------------------ ADMIN METHODS-----------------------
// get all the appointments 
router.get("/admin/all", async (req, res, next) => {
  try {
    //,{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1,"_id":0}
    const allAppointment = await User.find(
      //{},{"appointment":1,"_id":0}
    ); //, { appointmentDate, name, email }
    
    res.json(allAppointment);
  } catch (error) {
    res.json({ message: error });
  }
});

// get a specific appointment using the user id -- unfinished
// pass userId in the body
router.get("/admin/:userId", verify,async (req, res) => {
  try {
    const specificAppointment = await User.findById(req.body.userId);
    res.json(specificAppointment);
  } catch (error) {
    res.json({ message: error });
  }
});

// delete a specific appointment
//pass appointmentId & userId in the body  
router.delete("/admin/:userId", verify, async (req, res) => {
  try {
    const appointment = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pull: { appointment: { _id: req.body.appointmentId } } },
      { new: true },
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
    res.json(appointment);
  } catch (error) {
    res.json({ message: error });
  }
});

// update an appointment
// userId, appointmentId, appointmentDate in the body

router.patch("/admin/:userId", verify,async (req, res) => {
  try {
    const updatedAppointment = await User.findOneAndUpdate(
      { _id: req.body.userId, "appointment._id": req.body.appointmentId },
      { $set: { "appointment.$.appointmentDate": req.body.appointmentDate } },
      function (err, doc) {}
    );
    res.json(updatedAppointment);
  } catch (error) {
    res.json({ message: error });
  }
});
// create appointment
// pass usedId,appointmenDate, name & email
router.post("/admin/:userId", verify,async (req, res) => {
  try {
    var theAppointment = {
      appointmentDate: req.body.appointmentDate,
      name: req.body.name,
      email: req.body.email,
    };
    const createdAppointment = await User.updateOne(
      { _id: req.body.userId },
      { $push: { appointment: theAppointment } }
    );
    res.json(createdAppointment);
  } catch (error) {
    res.json({ message: error });
  }
});




module.exports = router;
