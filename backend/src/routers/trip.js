/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require('express');
const Trip = require('../models/trip');
const auth = require('../middleware/auth');
const Mine = require('../models/mine');
const Truck = require('../models/truck');
const Driver = require('../models/driver');

const router = new express.Router();

function getVolumeReportData(tripData, mineData, truckData, driverData) {
  return {
    trip_id: tripData.trip_id,
    mine_name: mineData.mine_name,
    mine_reg_no: tripData.mine_reg_no,
    createdAt: tripData.createdAt,
    is_overloaded: tripData.is_overloaded,
    is_underloaded: tripData.is_underloaded,
    truck_number: truckData.truck_number,
    truck_driver: driverData.fullname,
    driving_license: driverData.driving_license,
    truck_image: tripData.truck_image,
  };
}

function getBoulderReportData(tripData, mineData, truckData, driverData) {
  return {
    trip_id: tripData.trip_id,
    mine_name: mineData.mine_name,
    mine_reg_no: tripData.mine_reg_no,
    createdAt: tripData.createdAt,
    is_boulder_detected: tripData.is_boulder_detected,
    truck_number: truckData.truck_number,
    truck_driver: driverData.fullname,
    driving_license: driverData.driving_license,
    truck_image: tripData.truck_image,
  };
}

function getVolumeAnalysisData(requestData, tripData, truckData) {
  const returnData = {};
  returnData.truck_number = truckData.truck_number;
  returnData.from_date = requestData.from_date;
  returnData.to_date = requestData.to_date;
  returnData.overload_limit = truckData.overload_limit;
  returnData.underload_limit = truckData.underload_limit;
  const volumeData = [];
  let totalVolume = 0;
  let counter = 0;
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    tripData.forEach((trip) => {
      totalVolume += Number(trip.calculated_volume);
      counter += 1;
      volumeData.push({
        date: trip.createdAt,
        volume: trip.calculated_volume,
      });
      if (tripData.length <= counter) {
        returnData.total_volume = totalVolume;
        returnData.avg_volume = totalVolume / counter;
        returnData.volume_data = volumeData;
        return resolve(returnData);
      }
    });
  });
}

function constructTripData(data, truckData) {
  const retObj = {
    rfid_tag_no: data.rfid_tag_no,
    trip_id: data.trip_id,
    mine_reg_no: data.mine_reg_no,
    is_processed: false,
    calculated_volume: 0,
  };
  if (data.calculated_volume) {
    retObj.calculated_volume = data.calculated_volume;
    retObj.is_overloaded = data.calculated_volume > (truckData.corresponding_volume + truckData.cutoff_value);
    retObj.is_underloaded = data.calculated_volume < (truckData.corresponding_volume - truckData.cutoff_value);
    retObj.is_boulder_detected = data.is_boulder_detected;
    retObj.truck_image = data.truck_image;
    retObj.is_processed = true;
  }
  return retObj;
}

router.post('/addTripInfo', async (req, res) => {
  try {
    const truckData = await Truck.findOne({ rfid_tag_no: req.body.rfid_tag_no });
    const tripData = new Trip(constructTripData(req.body, truckData));
    await tripData.save();
    const responseObj = {
      status: 'SUCCESS',
      data: tripData,
    };
    res.status(201).send(responseObj);
  } catch (e) {
    console.error('Add Trip Info Error - ', e);
    const errObject = {
      status: 'FAILED',
      msg: 'Failed to add trip info',
    };
    res.status(400).send(errObject);
  }
});
router.patch('/addTripInfo', async (req, res) => {
  try {
    const tripData = await Trip.findOne({ trip_id: req.body.trip_id });
    console.log("REQ BODY --- ", req.body.calculated_volume);
    console.log("REQ BODY trip --- ", req.body.trip_id);
    console.log("REQ BODY trip --- ", tripData);
    const truckData = await Truck.findOne({ rfid_tag_no: tripData.rfid_tag_no });
    console.log("REQ BODY truck --- ", truckData);
    tripData.calculated_volume = req.body.calculated_volume;
    tripData.is_overloaded = tripData.calculated_volume > (truckData.corresponding_volume + truckData.cutoff_value);
    tripData.is_underloaded = tripData.calculated_volume < (truckData.corresponding_volume - truckData.cutoff_value);
    tripData.is_boulder_detected = req.body.is_boulder_detected;
    tripData.is_processed = true;
    console.log("trip data -- ", tripData);
    tripData.truck_image = req.body.truck_image;
    await tripData.save();
    const responseObj = {
      status: 'SUCCESS',
      data: tripData,
    };
    res.status(201).send(responseObj);
  } catch (e) {
    console.error('Update Trip Info Error - ', e);
    const errObject = {
      status: 'FAILED',
      msg: 'Failed to update trip info',
    };
    res.status(400).send(errObject);
  }
});

router.get('/getTripInfo', auth, async (req, res) => {
  try {
    let responseObj = {};
    const mineData = await Mine.find({ user_id: req.user.user_id });
    const tripDataArr = [];
    let counter = 0;
    mineData.forEach(async (mine) => {
      const tripData = await Trip.find({ mine_reg_no: mine.mine_reg_no });
      counter += 1;
      tripDataArr.push(...tripData);
      if (mineData.length <= counter) {
        responseObj = {
          status: 'SUCCESS',
          data: tripDataArr,
        };
        res.status(200).send(responseObj);
      }
    });
  } catch (e) {
    console.error('Failed to get trip data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get trip data',
    };
    res.status(500).send(errorObj);
  }
});

router.get('/getTripById', auth, async (req, res) => {
  try {
    let responseObj = {};
    const tripData = await Trip.findOne({ trip_id: req.body.trip_id });
    responseObj = {
      status: 'SUCCESS',
      data: tripData,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get trip data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get trip data',
    };
    res.status(500).send(errorObj);
  }
});

router.get('/getVolumeReport/:trip_id', auth, async (req, res) => {
  try {
    let responseObj = {};
    let tripData = await Trip.findOne({ trip_id: req.params.trip_id });
    const mineData = await Mine.findOne({ mine_reg_no: tripData.mine_reg_no });
    const truckData = await Truck.findOne({ rfid_tag_no: tripData.rfid_tag_no });
    const driverData = await Driver.findOne({
      assigned_truck_number: truckData.truck_number,
    });
    tripData = getVolumeReportData(tripData, mineData, truckData, driverData);
    responseObj = {
      status: 'SUCCESS',
      data: tripData,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get trip volume report data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get trip volume report data',
    };
    res.status(400).send(errorObj);
  }
});

router.get('/getVolumeAnalysis/:truck_number/:from_date/:to_date', auth, async (req, res) => {
  try {
    let responseObj = {};
    const truckData = await Truck.findOne({ truck_number: req.params.truck_number });
    const fromDate = new Date(req.params.from_date);
    const toDate = new Date(req.params.to_date);
    let tripData = await Trip.find({
      rfid_tag_no: truckData.rfid_tag_no,
      createdAt: {
        $gte: fromDate,
        $lte: toDate,
      },
    });
    if (tripData.length <= 0) {
      console.error('Failed to get volume analysis data');
      responseObj = {
        status: 'SUCCESS',
        data: [],
      };
    }
    tripData = await getVolumeAnalysisData(req.params, tripData, truckData);
    responseObj = {
      status: 'SUCCESS',
      data: tripData,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get volume analysis data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get volume analysis data',
    };
    res.status(500).send(errorObj);
  }
});

router.get('/getBoulderReport/:trip_id', auth, async (req, res) => {
  try {
    let responseObj = {};
    let tripData = await Trip.findOne({ trip_id: req.params.trip_id });
    const mineData = await Mine.findOne({ mine_reg_no: tripData.mine_reg_no });
    const truckData = await Truck.findOne({ rfid_tag_no: tripData.rfid_tag_no });
    const driverData = await Driver.findOne({
      assigned_truck_number: truckData.truck_number,
    });
    tripData = getBoulderReportData(tripData, mineData, truckData, driverData);
    responseObj = {
      status: 'SUCCESS',
      data: tripData,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get trip boulder report data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get trip boulder report data',
    };
    res.status(400).send(errorObj);
  }
});

router.get('/getTripListForTruck', auth, async (req, res) => {
  try {
    const tripData = await Trip.find({ rfid_tag_no: req.query.rfid_tag_no, is_processed: false }, 'trip_id').distinct('trip_id');
    console.log("getTripListForTruck : ", tripData);
    const responseObj = {
      status: 'SUCCESS',
      data: tripData,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get trip list - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get trip list',
    };
    res.status(500).send(errorObj);
  }
});
module.exports = router;
