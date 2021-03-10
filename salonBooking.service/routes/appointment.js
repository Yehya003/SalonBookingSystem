var express = require('express');
var router = express.Router();
const verify =  require('./verifyToken');

/* GET home page. */
router.get('/',verify, (req, res) => {
  res.json({ 
    title: 'THIS IS A PRIVATE ROUTE' 
  });
});

module.exports = router;
