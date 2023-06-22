const express = require('express');
const Charge = require('../models/charge');
const auth = require('../middleware/auth');

const router = new express.Router();

function constructChargeData(data, user) {
  return {
    charge_id: data.charge_id,
    total_charge_used: data.total_charge_used,
    number_of_primers: data.number_of_primers,
    number_of_detonators: data.number_of_detonators,
    chagre_density: data.chagre_density,
    length: data.length,
    stemming: data.stemming,
    diameter: data.diameter,
    subdrilling: data.subdrilling,
    angle: data.angle,
    azimuth: data.azimuth,
    water_in_hole: data.water_in_hole,
    user_id: user.user_id,
  };
}

router.post('/addChargeInfo', auth, async (req, res) => {
  const charge = await Charge.find({ charge_id: req.body.charge_id });
  if (charge && charge.length > 0) {
    const errObject = {
      status: 'FAILED',
      msg: 'Charge Id already present',
    };
    return res.status(403).send(errObject);
  }
  const chargeData = new Charge(constructChargeData(req.body, req.user));
  try {
    await chargeData.save();
    const responseObj = {
      status: 'SUCCESS',
      data: chargeData,
    };
    return res.status(201).send(responseObj);
  } catch (e) {
    console.error('Add Charge Info Error - ', e);
    const errObject = {
      status: 'FAILED',
      msg: 'Failed to add charge info',
    };
    return res.status(400).send(errObject);
  }
});

router.get('/getChargeInfo', auth, async (req, res) => {
  try {
    let responseObj = {};
    const chargeData = await Charge.find({ user_id: req.user.user_id });
    responseObj = {
      status: 'SUCCESS',
      data: chargeData,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get Charge data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get Charge data',
    };
    res.status(500).send(errorObj);
  }
});

module.exports = router;
