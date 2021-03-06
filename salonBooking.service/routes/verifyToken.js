const jwt = require("jsonwebtoken");

function verifyingToken(req, res, next) {
  
  let token = req.headers.authorization.split(" ")[1]; //req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verifiedToken;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token!");
  }
};

/*
function verifyingToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("IN this"+"Unauthorized request");
  }
  let payload = jwt.verify(token, process.env.TOKEN_SECRET);
  
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}
*/
module.exports = verifyingToken;
/*
if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
* */
