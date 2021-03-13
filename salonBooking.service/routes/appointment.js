var express = require('express');
var router = express.Router();
const User = require("../model/User");
const verify =  require('./verifyToken');

/* GET home page. */
router.get('/',verify, (req, res) => {
  res.json({ 
    title: 'THIS IS A PRIVATE ROUTE' 
  });
});

router.get('/allAppointments', async (req, res, next) => {
  try {
    const allAppointment = await User.find({}, "appointment"); //, { appointmentDate, name, email }
    res.json(allAppointment);
  } catch (error) {
    res.json({message: error});
  }  
});

/*
In these methods below we should specify the appointment id 
*/

// get a specific user using his id
router.get('/:userId', async (req, res) => {
  try {
     const specificAppointment = await User.findById(req.params.userId);
  res.json(specificAppointment);
  } catch (error) {
    res.json({message: error});
  }  
});

// delete a specific user
router.delete('/:userId', async (req, res) => {
  try {
    const appointment= await User.remove({_id: req.params.userId})
    res.json(appointment);
  } catch (error) {
    res.json({message: error});
  }  
});

// update a user name 
router.patch('/userId', async ()=>{
try {
  const updatedAppointment= await User.updateOne({_id: req.params.userId}, 
    {$set:{name: req.body.name}})
  res.json(updatedAppointment);
} catch (error) {
  res.json({message: error});
}
});

module.exports = router;
