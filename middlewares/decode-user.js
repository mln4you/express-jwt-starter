const jwt = require('jsonwebtoken');

/**
 * Decodes user and sets user id in req body 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const decodeUser = (req, res, next) => {
  const header = req.get('Authorization');
  let token = null;
  let decoded = null;
  if (header) {
    token = header.split(" ")[1];
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }
  req.body.userId = decoded.id;

  if (req.get('content-type').includes('multipart/form-data')) {
    req.params.userId = decoded.id;
  }
  
  next();
}

module.exports = decodeUser;
