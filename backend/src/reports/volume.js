/* eslint-disable arrow-parens */
/* eslint-disable operator-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const express = require('express');
const Trip = require('../models/trip');
const auth = require('../middleware/auth');
const Truck = require('../models/truck');

const router = new express.Router();

function getVolumeReport(tripArray, period) {
  return new Promise((resolve, reject) => {
    const returnData = {};
    let counter = 0;
    tripArray.forEach((trip) => {
      const date = trip.createdAt;
      let key;
      if (period === 'WEEKLY') {
        key = `${Number(date.getDate() - date.getDay())}-${Number(date.getMonth() + 1)}-${date.getFullYear()}`;
      } else if (period === 'MONTHLY') {
        key = `${Number(date.getMonth() + 1)}-${date.getFullYear()}`;
      } else if (period === 'YEARLY') {
        key = `${date.getFullYear()}`;
      } else {
        key = `${date.getDate()}-${Number(date.getMonth() + 1)}-${date.getFullYear()}`;
      }
      if (returnData[key]) {
        returnData[key] = returnData[key] + Number(trip.calculated_volume);
      } else {
        returnData[key] = Number(trip.calculated_volume);
      }
      counter += 1;
      if (tripArray.length <= counter) {
        const retdata = [];
        Object.keys(returnData).forEach(data => {
          retdata.push({ date: data, value: returnData[data] });
        });
        return resolve(retdata)
      }
    });
  });
}

function getTruckInsight(tripArray, period) {
  return new Promise((resolve, reject) => {
    const returnData = {};
    let counter = 0;
    tripArray.forEach((trip) => {
      const date = trip.createdAt;
      let key;
      if (period === 'WEEKLY') {
        key = `${Number(date.getDate() - date.getDay())}-${Number(date.getMonth() + 1)}-${date.getFullYear()}`;
      } else if (period === 'MONTHLY') {
        key = `${Number(date.getMonth() + 1)}-${date.getFullYear()}`;
      } else if (period === 'YEARLY') {
        key = `${date.getFullYear()}`;
      } else {
        key = `${date.getDate()}-${Number(date.getMonth() + 1)}-${date.getFullYear()}`;
      }
      if (returnData[key]) {
        returnData[key] = returnData[key] + 1;
      } else {
        returnData[key] = 1;
      }
      counter += 1;
      if (tripArray.length <= counter) {
        const retdata = [];
        Object.keys(returnData).forEach(data => {
          retdata.push({ date: data, value: returnData[data] });
        });
        return resolve(retdata);
      }
    });
  });
}

// By Contractor: contractor, period, start_date, end_date
router.get('/getVolumeByContractor', auth, async (req, res) => {
  try {
    const { contractor } = req.query;
    const period = req.query.period.toUpperCase();
    const startDate = new Date(req.query.start_date);
    const endDate = new Date(req.query.end_date);
    const truckDataFilter = { user_id: req.user.user_id };

    if (contractor.toUpperCase() !== 'ALL') {
      truckDataFilter.contractor_company = contractor;
    }

    const truckData = await Truck.find(truckDataFilter);
    const rfidArray = [];

    truckData.forEach(async (truck) => {
      rfidArray.push(truck.rfid_tag_no);
    });
    const tripData = await Trip.find({
      rfid_tag_no: { $in: rfidArray },
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ createdAt: 'asc' });

    const responseData = {};
    responseData.contractor = contractor;
    responseData.period = period;
    responseData.start_date = startDate;
    responseData.end_date = endDate;
    if (tripData.length <= 0) {
      responseData.volume = {};
    } else {
      responseData.volume = await getVolumeReport(tripData, period);
    }
    const responseObj = {
      status: 'SUCCESS',
      data: responseData,
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

// By Truck: truck_num, period, start_date, end_date
router.get('/getVolumeByTruck', auth, async (req, res) => {
  try {
    console.log('getVolumeByTruck query: ', req.query);
    const truckNum = req.query.truck_num.toUpperCase();
    const period = req.query.period.toUpperCase();
    const startDate = new Date(req.query.start_date);
    const endDate = new Date(req.query.end_date);
    const truckDataFilter = { user_id: req.user.user_id };

    if (truckNum !== 'ALL') {
      truckDataFilter.truck_number = truckNum;
    }

    const truckData = await Truck.find(truckDataFilter);
    const rfidArray = [];
    console.log('getVolumeByTruck truckData: ', truckData);
    truckData.forEach(async (truck) => {
      rfidArray.push(truck.rfid_tag_no);
    });
    console.log('getVolumeByTruck rfidArray: ', rfidArray);
    const tripData = await Trip.find({
      rfid_tag_no: { $in: rfidArray },
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ createdAt: 'asc' });
    console.log('getVolumeByTruck tripData: ', tripData);

    const responseData = {};
    responseData.truck_num = truckNum;
    responseData.period = period;
    responseData.start_date = startDate;
    responseData.end_date = endDate;
    if (tripData.length <= 0) {
      responseData.volume = {};
    } else {
      responseData.volume = await getVolumeReport(tripData, period);
    }
    console.log('getVolumeByTruck responseData: ', responseData);
    const responseObj = {
      status: 'SUCCESS',
      data: responseData,
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

// Overweight/Underweight: type, period, contractor, start_date, end _date
router.get('/getTruckInsight', auth, async (req, res) => {
  try {
    const type = req.query.type.toUpperCase();
    const period = req.query.period.toUpperCase();
    const { contractor } = req.query;
    const startDate = new Date(req.query.start_date);
    const endDate = new Date(req.query.end_date);
    const truckDataFilter = { user_id: req.user.user_id };

    if (contractor) {
      truckDataFilter.contractor = contractor;
    }

    const truckData = await Truck.find(truckDataFilter);
    const rfidArray = [];
    console.log("truckData -- ", truckData);
    truckData.forEach(async (truck) => {
      rfidArray.push(truck.rfid_tag_no);
    });

    const tripDataQuery = {
      rfid_tag_no: { $in: rfidArray },
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    if (type === 'OVERWEIGHT') {
      tripDataQuery.is_overloaded = true;
    } else if (type === 'UNDERWEIGHT') {
      tripDataQuery.is_underloaded = true;
    }
    const tripData = await Trip.find(tripDataQuery).sort({ createdAt: 'asc' });
    console.log("tripData -- ", tripData);
    const responseData = {};
    responseData.type = type;
    responseData.period = period;
    responseData.start_date = startDate;
    responseData.end_date = endDate;
    responseData.contractor = contractor;
    if (tripData.length <= 0) {
      responseData.num_of_trucks = {};
    } else {
      responseData.num_of_trucks = await getTruckInsight(tripData, period);
    }
    const responseObj = {
      status: 'SUCCESS',
      data: responseData,
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

router.get('/getContractorList', auth, async (req, res) => {
  try {
    const contractorCompany = await Truck.find({ user_id: req.user.user_id }, 'contractor_company').distinct('contractor_company');
    console.log('getContractorList : ', contractorCompany);
    const responseObj = {
      status: 'SUCCESS',
      data: contractorCompany,
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

module.exports = router;
