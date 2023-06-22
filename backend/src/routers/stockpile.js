/* eslint-disable no-param-reassign */
const express = require('express');
const Stockpile = require('../models/stockpile');
const auth = require('../middleware/auth');
const Mine = require('../models/mine');
const Material = require('../models/material');

const router = new express.Router();

function constructStockpileData(data) {
  return {
    stockpile_name: data.blast_id,
    material_sku: data.blast_material,
    mine_reg_no: data.mine_reg_no,
    image: data.image,
  };
}
function updateStockpileData(currentInstance, patchInformation, materialData) {
  currentInstance.volume = patchInformation.volume;
  currentInstance.tonnage = patchInformation.volume * materialData.density;
  currentInstance.total_volume = currentInstance.tonnage * materialData.price;
  return currentInstance;
}

router.post('/addStockpileInfo', auth, async (req, res) => {
  const stockpileData = new Stockpile(constructStockpileData(req.body, req.user));
  try {
    await stockpileData.save();
    const responseObj = {
      status: 'SUCCESS',
      data: stockpileData,
    };
    return res.status(201).send(responseObj);
  } catch (e) {
    console.error('Add Stockpile Info Error - ', e);
    const errObject = {
      status: 'FAILED',
      msg: 'Failed to add Stockpile info',
    };
    return res.status(400).send(errObject);
  }
});

router.get('/getStockpileInfo', auth, async (req, res) => {
  try {
    let responseObj = {};
    const mineData = await Mine.find({ user_id: req.user.user_id });
    const stockpileDataArr = [];
    let counter = 0;
    mineData.forEach(async (mine) => {
      const stockpileData = await Stockpile.find({ mine_reg_no: mine.mine_reg_no });
      counter += 1;
      stockpileDataArr.push(...stockpileData);
      if (mineData.length <= counter) {
        responseObj = {
          status: 'SUCCESS',
          data: stockpileDataArr,
        };
        res.status(200).send(responseObj);
      }
    });
  } catch (e) {
    console.error('Failed to get stockpile data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get stockpile data',
    };
    res.status(500).send(errorObj);
  }
});

router.patch('/updateStockpileInfo', auth, async (req, res) => {
  try {
    let responseObj = {};
    let stockpileData = await Stockpile.findOne({ stockpile_id: req.stockpile_id });
    if (!stockpileData) {
      const errorObj = {
        status: 'FAILED',
        msg: 'Failed to get process stockpile data, pre stockfile data not available',
      };
      res.status(500).send(errorObj);
    }
    // eslint-disable-next-line max-len
    const materialData = await Material.findOne({ sku: stockpileData.material_sku, user_id: req.user.user_id });
    if (!materialData) {
      const errorObj = {
        status: 'FAILED',
        msg: 'Failed to get process stockpile dat, material data not available',
      };
      res.status(500).send(errorObj);
    }
    stockpileData = updateStockpileData(stockpileData, req.body, materialData);
    await stockpileData.save();
    responseObj = {
      status: 'SUCCESS',
      data: stockpileData,
    };
    return res.status(204).send(responseObj);
  } catch (e) {
    console.error('Failed to get Blast data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get Blast data',
    };
    return res.status(500).send(errorObj);
  }
});
module.exports = router;
