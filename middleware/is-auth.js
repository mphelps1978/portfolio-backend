const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = (req, res, next) => {
  // ensure that the request has an Authorization header
  const authHeader = req.get('Authorization')
  if(!authHeader) {
    req.isAuth = false
    return next()
  }
  const token = authHeader.split(' ')[1]
//ensure that the Authorization header has a Token
  if(!token || token === '') {
    req.isAuth = false
    return next()
  }
//Attempt to decode the token - if JWT cannot verify the token/secret combination, user is not authorized
  let decodedToken
  try {
    decodedToken = jwt.verify(token, secret)
  }
  catch (err) {
    console.log(err);
    req.isAuth = false
    return next()
  }
  if (!decodedToken){
    req.isAuth = false
    return next()
  }
  //All checks passed, authorize user and send the user ID
  req.isAuth = true
  req.userID = decodedToken.userID
  next()
}