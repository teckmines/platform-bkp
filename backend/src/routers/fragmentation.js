/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const Fragmentation = require('../models/fragmentation');
const Mine = require('../models/mine');
const Blast = require('../models/blast');
const auth = require('../middleware/auth');

const router = new express.Router();

function constructFragData(data) {
  return {
    frag_id: data.frag_id,
    mine_reg_no: data.mine_reg_no,
    is_processed: data.is_processed,
    blast_id: data.blast_id,
    blur: data.blur,
    clahe_threshold: data.clahe_threshold,
    clahe_clip_limit: data.clahe_clip_limit,
    mosper_iteration: data.mosper_iteration,
    kernel: data.kernel,
    dilate_iteration: data.dilate_iteration,
    image_desc: data.image_desc,
    x_axis_data: data.x_axis_data,
    y_axis_data: data.y_axis_data,
  };
}

router.post('/addFragResult', async (req, res) => {
  try {
    console.log("add frag result", req.body)
    const fragData = new Fragmentation(constructFragData(req.body));
    await fragData.save();
    const responseObj = {
      status: 'SUCCESS',
      data: fragData,
    };
    res.status(201).send(responseObj);
  } catch (e) {
    console.error('Add Fragmentaion Data Error - ', e);
    const errObject = {
      status: 'FAILED',
      msg: 'Failed to add fragmentation data',
    };
    res.status(400).send(errObject);
  }
});

router.get('/getFragResult', auth, async (req, res) => {
  try {
    let responseObj = {};
    const fragData = await Fragmentation.find({ mine_reg_no: req.query.mine_reg_no, blast_id: req.query.blast_id });
    responseObj = {
      status: 'SUCCESS',
      data: fragData,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get Fragmentation data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get Fragmentation data',
    };
    res.status(500).send(errorObj);
  }
});

router.get('/getFragResultById', auth, async (req, res) => {
  try {
    let responseObj = {};
    const fragData = await Fragmentation.findOne({ frag_id: req.body.frag_id });
    responseObj = {
      status: 'SUCCESS',
      data: fragData,
    };
    res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get Fragmentation data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get Fragmentation data',
    };
    res.status(500).send(errorObj);
  }
});

router.patch('/updateFragById', auth, async (req, res) => {
  let responseObj = {};
  try {
    const { frag_id } = req.body;
    const frag = await Fragmentation.findOne({ frag_id });

    if (!frag) {
      responseObj = {
        status: 'Failure',
        message: 'Original data no present',
      };
      return res.status(404).send(responseObj);
    }
    if (req.body && req.body.graph) {
      frag.x_axis_data = req.body.graph.x_axis;
      frag.y_axis_data = req.body.graph.y_axis;
      delete req.body.graph;
    }
    if (req.body && req.body.blast_efficiency) {
      frag.blast_efficiency = req.body.blast_efficiency;
    }
    const updateData = Object.keys(req.body);
    updateData.forEach((update) => frag[update] = req.body[update]);
    await frag.save();
    responseObj = {
      status: 'Success',
      message: 'Frag Data Updated',
    };
    res.status(201).send(responseObj);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch('/updateFragCaptureInfo', async (req, res) => {
  let responseObj = {};
  try {
    const frag = await Fragmentation.findOne({ frag_id: req.body.frag_id });

    if (!frag) {
      responseObj = {
        status: 'Failure',
        message: 'Original data no present',
      };
      return res.status(404).send(responseObj);
    }
    frag.is_captured = true;
    await frag.save();
    responseObj = {
      status: 'Success',
      message: 'Frag Data Updated',
    };
    res.status(201).send(responseObj);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/getFragByBlastPattern', auth, async (req, res) => {
  try {
    let responseObj = {};
    const mineData = await Mine.find({ user_id: req.user.user_id });
    const fragDataArr = [];
    let counter_mine = 0;

    mineData.forEach(async (mine) => {
      counter_mine += 1;
      let counter_frag = 0;
      const fragData = await Fragmentation.find({ mine_reg_no: mine.mine_reg_no });
      fragData.forEach(async (frag) => {
        console.log('ABCDEF1 --', frag.frag_id);
        const blastData = await Blast.findOne({ blast_id: frag.blast_id, blast_pattern: req.query.blast_patter });
        console.log('ABCDEF2 --', blastData.blast_id);
        if (blastData) {
          fragDataArr.push(frag);
        }
        counter_frag += 1;
        if (mineData.length <= counter_mine && fragData.length <= counter_frag) {
          responseObj = {
            status: 'SUCCESS',
            data: fragDataArr,
          };
          res.status(200).send(responseObj);
        }
      });
    });
  } catch (e) {
    console.error('Failed to get Fragmentation data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get Fragmentation data',
    };
    res.status(500).send(errorObj);
  }
});
module.exports = router;
