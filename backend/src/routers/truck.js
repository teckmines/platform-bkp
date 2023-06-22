/* eslint-disable camelcase */
const express = require('express');
const Truck = require('../models/truck');
const auth = require('../middleware/auth');

const router = new express.Router();

function constructTruckData(data, user) {
  return {
    rfid_tag_no: data.rfid_tag_no,
    truck_number: data.truck_number,
    truck_brand: data.truck_brand,
    truck_model: data.truck_model,
    truck_owner: data.truck_owner,
    corresponding_volume: data.corresponding_volume,
    cutoff_value: data.cutoff_value,
    contractor_company: data.contractor_company,
    contractor_pic: data.contractor_pic,
    contractor_address: data.contractor_address,
    contractor_gstin: data.contractor_gstin,
    contract_start_date: data.contract_start_date,
    contract_end_date: data.contract_end_date,
    remarks: data.remarks,
    user_id: user.user_id,
  };
}

router.post('/addTruckInfo', auth, async (req, res) => {
  const truckData = new Truck(constructTruckData(req.body, req.user));
  try {
    await truckData.save();
    console.info('Truck data added successfully - ', truckData);
    const responseObj = {
      status: 'SUCCESS',
      data: truckData,
    };
    res.status(201).send(responseObj);
  } catch (e) {
    console.error('Add Truck Info Error - ', e);
    const errObject = {
      status: 'FAILED',
      msg: 'Failed to add truck info',
    };
    res.status(400).send(errObject);
  }
});

router.get('/getTruckInfo', auth, async (req, res) => {
  try {
    let responseObj = {};
    const truck = await Truck.find({ user_id: req.user.user_id });
    responseObj = {
      status: 'SUCCESS',
      data: truck,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get truck data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get truck data',
    };
    res.status(500).send(errorObj);
  }
});

router.get('/getTruckList', auth, async (req, res) => {
  try {
    const truckNumber = await Truck.find({ user_id: req.user.user_id }, 'truck_number').distinct('truck_number');
    console.log("getTruckList : ", truckNumber);
    const responseObj = {
      status: 'SUCCESS',
      data: truckNumber,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get truck list - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get truck list',
    };
    res.status(500).send(errorObj);
  }
});

router.patch('/truckRegistered', async (req, res) => {
  let responseObj = {};
  try {
    const { rfid_tag_no } = req.body;
    const truckData = await Truck.findOne({ rfid_tag_no });
    if (!truckData) {
      responseObj = {
        status: 'Failure',
        message: 'Truck not present for the RFID',
      };
      return res.status(404).send(responseObj);
    }
    truckData.is_registered = true;
    await truckData.save();
    responseObj = {
      status: 'SUCCESS',
      data: truckData,
    };
    return res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get truck data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to fetch truck data',
    };
    return res.status(500).send(errorObj);
  }
});

router.patch('/truckProcessed', async (req, res) => {
  let responseObj = {};
  try {
    const { rfid_tag_no } = req.body;
    const truckData = await Truck.findOne({ rfid_tag_no });
    if (!truckData) {
      responseObj = {
        status: 'Failure',
        message: 'Truck not present for the RFID',
      };
      return res.status(404).send(responseObj);
    }
    truckData.is_processsed_truck = true;
    await truckData.save();
    responseObj = {
      status: 'SUCCESS',
      data: truckData,
    };
    return res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get truck data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to fetch truck data',
    };
    return res.status(500).send(errorObj);
  }
});

router.patch('/bodyProcessed', async (req, res) => {
  let responseObj = {};
  try {
    const { rfid_tag_no } = req.body;
    const truckData = await Truck.findOne({ rfid_tag_no });
    if (!truckData) {
      responseObj = {
        status: 'Failure',
        message: 'Truck not present for the RFID',
      };
      return res.status(404).send(responseObj);
    }
    truckData.is_processsed_body = true;
    await truckData.save();
    responseObj = {
      status: 'SUCCESS',
      data: truckData,
    };
    return res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get truck data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to fetch truck data',
    };
    return res.status(500).send(errorObj);
  }
});

router.patch('/headProcessed', async (req, res) => {
  let responseObj = {};
  try {
    const { rfid_tag_no } = req.body;
    const truckData = await Truck.findOne({ rfid_tag_no });
    if (!truckData) {
      responseObj = {
        status: 'Failure',
        message: 'Truck not present for the RFID',
      };
      return res.status(404).send(responseObj);
    }
    truckData.is_processsed_head = true;
    await truckData.save();
    responseObj = {
      status: 'SUCCESS',
      data: truckData,
    };
    return res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get truck data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to fetch truck data',
    };
    return res.status(500).send(errorObj);
  }
});
module.exports = router;
