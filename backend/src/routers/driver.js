const express = require('express');
const Driver = require('../models/driver');
const auth = require('../middleware/auth');

const router = new express.Router();

function constructDriverData(data, user) {
  return {
    driving_license: data.driving_license,
    fullname: data.fullname,
    address: data.address,
    image: data.image,
    assigned_truck_number: data.assigned_truck_number,
    user_id: user.user_id,
  };
}

router.post('/addDriverInfo', auth, async (req, res) => {
  const driverData = new Driver(constructDriverData(req.body, req.user));
  try {
    await driverData.save();
    const responseObj = {
      status: 'SUCCESS',
      data: driverData,
    };
    res.status(201).send(responseObj);
  } catch (e) {
    console.error('Add Driver Info Error - ', e);
    const errObject = {
      status: 'FAILED',
      msg: 'Failed to add driver info',
    };
    res.status(400).send(errObject);
  }
});

router.get('/getDriverInfo', auth, async (req, res) => {
  try {
    let responseObj = {};
    const driverData = await Driver.find({ user_id: req.user.user_id });
    responseObj = {
      status: 'SUCCESS',
      data: driverData,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get Driver data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get Driver data',
    };
    res.status(500).send(errorObj);
  }
});

router.post('/assignTruck', auth, async (req, res) => {
  try {
    let responseObj = {};
    const driverData = await Driver.findOne({ driving_license: req.body.driving_license });
    const confirmationCheck = !!req.body.confirm;
    if (driverData && driverData.assigned_truck_number && confirmationCheck) {
      console.info('Failed to assign truck - truk already assigned need confirmation');
      const errorObj = {
        status: 'FAILED',
        msg: 'Failed to assign truck',
      };
      return res.status(401).send(errorObj);
    }
    driverData.assigned_truck_number = req.body.assigned_truck_number;
    await driverData.save();
    responseObj = {
      status: 'SUCCESS',
      data: driverData,
    };
    return res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to assign truck - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to assign truck',
    };
    return res.status(500).send(errorObj);
  }
});

module.exports = router;
