const { json } = require("express");
var express = require("express");
var router = express.Router();
const User = require("../model/User");
const verify = require("./verifyToken");

// ------------------CUSTOMER METHODS-----------------------
router.post( "/createAppointment",verify,async (req, res) => {
  try {
    console.log(
      req.body.appointment.appointmentId,
      req.body.appointment.appointmentDate,
      req.user._id,
    );
    let id = req.user._id;
    var theAppointment = {
      appointmentId: req.body.appointment.appointmentId,
      appointmentDate: req.body.appointment.appointmentDate,
      name: req.body.appointment.name,
      email: req.body.appointment.email,
    };
    //
    const createdAppointment = await User.updateOne(
      { _id: id },
      { $set: { appointment: theAppointment } },
      { new: true }
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
    const allAppointment = await User
      .find
      //{},{"appointment":1,"_id":0}
      (); //, { appointmentDate, name, email }

    res.json(allAppointment);
  } catch (error) {
    res.json({ message: error });
  }
});

// get a specific appointment using the user id -- unfinished
// pass userId in the body
router.get("/admin/:userId", verify, async (req, res) => {
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

 var theAppointment = {
   appointment: {
     appointmentId: null,
     appointmentDate: null,
     name: null,
     email: null,
   },
 };
    const appointment = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: { 
        //appointment:  theAppointment
        "appointment.appointmentDate": theAppointment.appointmentDate
       } },
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

router.patch("/admin/:userId", verify, async (req, res) => {
  try {
    const updatedAppointment = await User.findOneAndUpdate(
      {
        _id: req.body.userId,
        "appointment.appointmentId": req.body.appointment.appointmentId,
      },
      {
        $set: {
          "appointment.appointmentDate": req.body.appointment.appointmentDate,
        },
      },
      function (err, doc) {}
    );
    console.log(updatedAppointment);
    res.json(updatedAppointment);
  } catch (error) {
    res.json({ message: error });
  }
});
// create appointment
// pass userId,appointmentId,appointmenDate, name & email
router.put("/admin/:userId", verify, async (req, res) => {
  try {
   
    let id = req.body.userId;
   
    var theAppointment = {
      appointment: {
        appointmentId: req.body.appointment.appointmentId,
        appointmentDate: req.body.appointment.appointmentDate,
        name: req.body.appointment.name,
        email: req.body.appointment.email,
      },
      
    };
    console.log(theAppointment);
    // { $push: theAppointment }
    const createdAppointment = await User.updateOne({ _id: id }, theAppointment);
    res.json(createdAppointment);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
