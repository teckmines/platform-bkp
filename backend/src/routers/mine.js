/* eslint-disable camelcase */
const express = require('express');
const Mine = require('../models/mine');
const auth = require('../middleware/auth');

const router = new express.Router();

function constructMineData(data, user) {
  return {
    mine_name: data.mine_name,
    leasing_area: data.leasing_area,
    mine_reg_no: data.mine_reg_no,
    mine_region: data.mine_region,
    mine_address: data.mine_address,
    mine_loc_lat: data.mine_loc_lat,
    mine_loc_long: data.mine_loc_long,
    lease_validity: data.lease_validity,
    mine_addtnl_dtls: data.mine_addtnl_dtls,
    mine_type: data.mine_type,
    land_type: data.land_type,
    mine_material: data.mine_material,
    rock_type: data.rock_type,
    crusher_type: data.crusher_type,
    crusher_capacity: data.crusher_capacity,
    user_id: user.user_id,
  };
}

router.post('/addMineInfo', auth, async (req, res) => {
  const mineData = new Mine(constructMineData(req.body, req.user));
  try {
    await mineData.save();
    const responseObj = {
      status: 'SUCCESS',
      data: mineData,
    };
    res.status(201).send(responseObj);
  } catch (e) {
    console.error('Add Mine Info Error - ', e);
    const errObject = {
      status: 'FAILED',
      msg: 'Failed to add mine info',
    };
    res.status(400).send(errObject);
  }
});

router.get('/getMineInfo', auth, async (req, res) => {
  try {
    let responseObj = {};
    const mineData = await Mine.find({ user_id: req.user.user_id });
    responseObj = {
      status: 'SUCCESS',
      data: mineData,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get Mine data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get Mine data',
    };
    res.status(500).send(errorObj);
  }
});

router.get('/getMineById', auth, async (req, res) => {
  try {
    console.log(req.user);
    let responseObj = {};
    const mineData = await Mine.findOne({ _id: req.body.mine_id });
    responseObj = {
      status: 'SUCCESS',
      data: mineData,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get Mine data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get Mine data',
    };
    res.status(500).send(errorObj);
  }
});

router.get('/getCrusherSize', async (req, res) => {
  try {
    const { mine_reg_no } = req.body;
    const crusherSize = await Mine.find({ mine_reg_no }, 'crusher_size');
    console.log("CRUCHER SIZE - ", crusherSize);
    const responseObj = {
      status: 'SUCCESS',
      data: crusherSize,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get crusher size for the mine ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get crusher size for the mine',
    };
    res.status(500).send(errorObj);
  }
});
module.exports = router;
