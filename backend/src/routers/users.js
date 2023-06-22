/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const auth = require('../middleware/auth');

const router = new express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'aabrakadabra';
const JWT_TIMEOUT = process.env.JWT_TIMEOUT || 604800; // 7 days by default
const SALT = process.env.SALT || 12;

function constructUserData(data, password) {
  return {
    name: data.name,
    email: data.email,
    password,
    user_type: data.user_type,
    phone_no: data.phone_no,
    id_prrof_name: data.id_prrof_name,
    id_prrof_uid: data.id_prrof_uid,
    address: data.address,
  };
}

router.post('/addUser', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (user) {
      console.error('User already Exists');
      const errObject = {
        status: 'FAILED',
        msg: 'User already Exists',
      };
      return res.status(400).send(errObject);
    }
    const salt = await bcrypt.genSalt(SALT);
    const salttePassword = await bcrypt.hash(password, salt);

    const userData = new Users(constructUserData(req.body, salttePassword));
    await userData.save();
    console.info('User added successfully - ', userData);
    const responseObj = {
      status: 'SUCCESS',
      data: userData,
    };
    res.status(201).send(responseObj);
  } catch (e) {
    console.error('Add User Error - ', e);
    const errObject = {
      status: 'FAILED',
      msg: 'Failed to add User',
    };
    res.status(400).send(errObject);
  }
});

router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  let responseObj = {};
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      console.error('Failed to login, user not exist - ', email);
      responseObj = {
        status: 'FAILED',
        msg: 'User not Exist',
      };
      return res.status(400).send(responseObj);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Failed to login, Incorrect password- ', email);
      responseObj = {
        status: 'FAILED',
        msg: 'Incorrect Password',
      };
      return res.status(400).send(responseObj);
    }
    const payload = {
      user: {
        email: user.email,
        _id: user._id,
      },
    };
    jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_TIMEOUT,
    }, async (err, token) => {
      if (err) {
        console.error('Failed to login for ', email, ' with error - ', err);
        responseObj = {
          status: 'FAILED',
          msg: 'Server Error',
        };
        return res.status(500).send(responseObj);
      }
      user.tokens = user.tokens.concat({ token });
      await user.save();
      responseObj = {
        status: 'SUCCESS',
        email,
        token,
      };
      res.status(200).json(responseObj);
    });
  } catch (e) {
    console.error('Failed to login for - ', email, ' server error - ', e);
    responseObj = {
      status: 'FAILED',
      msg: 'Server Error',
    };
    return res.status(500).send(responseObj);
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.status(200).send({ msg: 'Logout Successfull.' });
  } catch (e) {
    res.status(500).send();
  }
});

// router.post('/changePassword', auth, async (req, res) => {
// });

module.exports = router;
