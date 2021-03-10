const jwt = require('jsonwebtoken');

function verifyingToken(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verifiedToken;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token!");
  }
};

module.exports =  verifyingToken;