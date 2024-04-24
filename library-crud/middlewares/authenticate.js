const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authentication denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token Invalid' });
  }
};
