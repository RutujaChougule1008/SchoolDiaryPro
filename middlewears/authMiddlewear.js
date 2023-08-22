const jwt = require('jsonwebtoken');
const config = process.env;
module.exports = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }
console.log(token)
  try {
    const decoded = jwt.verify(token,  config.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: err });
  }
};
