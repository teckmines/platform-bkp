const express = require('express');
const Material = require('../models/material');
const auth = require('../middleware/auth');

const router = new express.Router();

function constructMaterialData(data, user) {
  return {
    sku: data.sku,
    material_name: data.material_name,
    description: data.description,
    denstiy: data.denstiy,
    price: data.price,
    currency: data.currency,
    notes: data.notes,
    user: user.user_id,
  };
}

router.post('/addMaterialInfo', auth, async (req, res) => {
  const material = await Material.find({ sku: req.body.sku, user_id: req.user.user_id });
  if (material && material.length > 0) {
    const errObject = {
      status: 'FAILED',
      msg: 'Material already present',
    };
    return res.status(403).send(errObject);
  }
  const materialData = new Material(constructMaterialData(req.body, req.user));
  try {
    await materialData.save();
    const responseObj = {
      status: 'SUCCESS',
      data: materialData,
    };
    return res.status(201).send(responseObj);
  } catch (e) {
    console.error('Add Material Info Error - ', e);
    const errObject = {
      status: 'FAILED',
      msg: 'Failed to add material info',
    };
    return res.status(400).send(errObject);
  }
});

router.get('/getMaterialInfo', auth, async (req, res) => {
  try {
    let responseObj = {};
    const materialData = await Material.find({ user_id: req.user.user_id });
    responseObj = {
      status: 'SUCCESS',
      data: materialData,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get material data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get material data',
    };
    res.status(500).send(errorObj);
  }
});

module.exports = router;
