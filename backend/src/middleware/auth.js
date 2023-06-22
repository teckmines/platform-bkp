/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'aabrakadabra';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Users.findOne({ _id: decoded.user._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    req.user.user_id = user._id;
    next();
  } catch (e) {
    console.error('Authentication Failed - ', e);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
