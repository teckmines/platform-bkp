const express = require('express');
const Blast = require('../models/blast');
const Mine = require('../models/mine');
const auth = require('../middleware/auth');

const router = new express.Router();

function constructBlastData(data) {
  return {
    blast_id: data.blast_id,
    no_of_holes: data.number_of_holes,
    spacing: data.spacing,
    blast_pattern: data.blast_pattern.toUpperCase(),
    mine_reg_no: data.mine_reg_no,
    blasting_incharge: data.blasting_incharge,
    burden: data.burden,
    depth_of_holes: data.depth_of_holes,
    stemming_length: data.stemming_length,
    no_of_detonators: data.number_of_detonators,
    no_of_nonels: data.number_of_nonels,
    bench: data.bench,
    delay_type: data.delay_type,
    charge_per_delay: data.charge_per_delay,
    latitude: data.latitude,
    longitude: data.longitude,
    explosive_charge: data.explosive_charge,
    drilling_pattern: data.drilling_pattern,
    blast_date_time: new Date(data.blast_date_time),
  };
}

router.post('/addBlastInfo', auth, async (req, res) => {
  const blast = await Blast.find({ blast_id: req.body.blast_id, mine_reg_no: req.body.mine_reg_no });
  if (blast && blast.length > 0) {
    const errObject = {
      status: 'FAILED',
      msg: 'Blast Id already present',
    };
    return res.status(403).send(errObject);
  }
  const blastData = new Blast(constructBlastData(req.body, req.user));
  try {
    await blastData.save();
    const responseObj = {
      status: 'SUCCESS',
      data: blastData,
    };
    return res.status(201).send(responseObj);
  } catch (e) {
    console.error('Add Blast Info Error - ', e);
    const errObject = {
      status: 'FAILED',
      msg: 'Failed to add blast info',
    };
    return res.status(400).send(errObject);
  }
});

router.get('/getBlastInfo', auth, async (req, res) => {
  try {
    let responseObj = {};
    const mineData = await Mine.find({ user_id: req.user.user_id });
    const mineRegNoArray = [];
    mineData.forEach( mine => {
      mineRegNoArray.push(mine.mine_reg_no);
    });
    const blastData = await Blast.find({
      mine_reg_no: { $in: mineRegNoArray }
    }).sort({ createdAt: 'desc' });
    responseObj = {
      status: 'SUCCESS',
      data: blastData,
    };
    return res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get Blast data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get Blast data',
    };
    res.status(500).send(errorObj);
  }
});

/*

await Trip.find({
      rfid_tag_no: { $in: rfidArray },
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
*/
router.get('/getBlastPattern', auth, async (req, res) => {
  try {
    let responseObj = {};
    const mineData = await Mine.find({ user_id: req.user.user_id });
    const mineRegNoArr = [];
    mineData.forEach(async (mine) => {
      mineRegNoArr.push(mine.mine_reg_no);
    });
    const blastData = await Blast.find({ mine_reg_no: { $in: mineRegNoArr } }, 'blast_pattern')
      .distinct('blast_pattern');
    responseObj = {
      status: 'SUCCESS',
      data: blastData,
    };
    return res.status(200).send(responseObj);
  } catch (e) {
    console.error('Failed to get Blast data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get Blast data',
    };
    res.status(500).send(errorObj);
  }
});

module.exports = router;
