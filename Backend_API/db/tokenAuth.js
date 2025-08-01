const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) return res.sendStatus(401);
  console.log(token)
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log('Verified user payload:',user);
    req.user = user; // userId and email from the token payload
    next();
  });
}

module.exports = {authenticateToken}