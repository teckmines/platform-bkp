/* eslint-disable no-unused-vars */
/* eslint-disable no-lonely-if */
/* eslint-disable operator-assignment */
/* eslint-disable consistent-return */
const express = require('express');
const Blast = require('../models/blast');
const Mine = require('../models/mine');
const Fragmentaion = require('../models/fragmentation');
const auth = require('../middleware/auth');

const router = new express.Router();

async function getAggregatedBlastReport(blastArray, type, period) {
  return new Promise((resolve, reject) => {
    const returnData = {};
    let counter = 0;
    const returnDataCounter = {};
    blastArray.forEach(async (blast) => {
      const date = blast.createdAt;
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
      if (returnData[key] && type === 'BLAST EFFICIENCY') {
        console.log("BLAST ID2 -- ", blast);
        const fragData = await Fragmentaion.find({ blast_id: blast.blast_id });
        console.log("FRAG DATA2 -- ", fragData);
        let counterFrag = 0;
        let efficiencyCounter = 0;
        let fragBlastEfficiency = 0;
        fragData.forEach((frag) => {
          if (frag.blast_efficiency) {
            efficiencyCounter += 1;
            console.log("FRAG DATA2 -- ", frag.blast_efficiency);
            fragBlastEfficiency += frag.blast_efficiency;
          }
          counterFrag += 1;
        });
        if (fragData.length <= counterFrag) {
          returnData[key] = returnData[key] + (Number(fragBlastEfficiency) / efficiencyCounter);
          returnDataCounter[key] = returnDataCounter[key] + 1;
        }
      } else if (returnData[key]) {
        returnData[key] = returnData[key] + 1;
      } else if (type === 'BLAST EFFICIENCY') {
        const fragData = await Fragmentaion.find({ blast_id: blast.blast_id });
        let counterFrag = 0;
        let efficiencyCounter = 0;
        let fragBlastEfficiency = 0;
        fragData.forEach((frag) => {
          if (frag.blast_efficiency) {
            efficiencyCounter += 1;
            console.log("FRAG DATA1 -- ", frag.blast_efficiency);
            fragBlastEfficiency += Number(frag.blast_efficiency);
          }
          counterFrag += 1;
        });
        if (fragData.length <= counterFrag) {
          returnData[key] = (Number(fragBlastEfficiency) / efficiencyCounter);
          returnDataCounter[key] = 1;
          console.log(" returnData[key] ", fragBlastEfficiency, efficiencyCounter, returnData[key]);
        }
      } else {
        returnData[key] = 1;
      }
      counter += 1;
      if (blastArray.length <= counter) {
        const retdata = [];
        Object.keys(returnData).forEach(data => {
          let retDta = returnData[data];
          if (type === 'BLAST EFFICIENCY') {
            retDta = returnData[data] / returnDataCounter[data];
          }
          retdata.push({ date: data, value: retDta });
        });
        return resolve(retdata);
      }
    });
  });
}

// Aggregated Blast Reports: type, period, start_date, end_date
router.get('/aggregatedBlastReport', auth, async (req, res) => {
  try {
    const type = req.query.type.toUpperCase();
    const period = req.query.period.toUpperCase();
    const startDate = new Date(req.query.start_date);
    const endDate = new Date(req.query.end_date);
    const mineData = await Mine.find({ user_id: req.user.user_id });
    const mineRegNoArray = [];
    mineData.forEach(async (mine) => {
      mineRegNoArray.push(mine.mine_reg_no);
    });
    const blastData = await Blast.find({
      mine_reg_no: { $in: mineRegNoArray },
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ createdAt: 'asc' });

    const responseData = {};
    responseData.type = type;
    responseData.period = period;
    responseData.start_date = startDate;
    responseData.end_date = endDate;
    if (blastData.length <= 0) {
      responseData.aggregated_blast = {};
    } else {
      responseData.aggregated_blast = await getAggregatedBlastReport(blastData, type, period);
    }
    const responseObj = {
      status: 'SUCCESS',
      data: responseData,
    };
    return res.status(201).send(responseObj);
  } catch (e) {
    console.error('Failed to get Blast data - ', e);
    const errorObj = {
      status: 'FAILED',
      msg: 'Failed to get Blast data',
    };
    return res.status(500).send(errorObj);
  }
});

// Blast Pattern vs Blast Efficiency: blast_pattern, start_date, end_date
router.get('/blastPatternVsEfficiency', auth, async (req, res) => {
  try {
    const blastPattern = req.query.blast_pattern.toUpperCase();
    const startDate = new Date(req.query.start_date);
    const endDate = new Date(req.query.end_date);
    const mineData = await Mine.find({ user_id: req.user.user_id });
    const mineRegNoArray = [];
    mineData.forEach(async (mine) => {
      mineRegNoArray.push(mine.mine_reg_no);
    });
    const blastData = await Blast.find({
      mine_reg_no: { $in: mineRegNoArray },
      blast_pattern: blastPattern,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ createdAt: 'asc' });

    const responseData = {};
    responseData.blast_pattern = blastPattern;
    responseData.start_date = startDate;
    responseData.end_date = endDate;
    if (blastData.length <= 0) {
      responseData.blast_efficiency = {};
    } else {
      responseData.blast_efficiency = await getAggregatedBlastReport(blastData, 'BLAST EFFICIENCY', 'DAILY');
    }
    console.log("responseData.blast_efficiency -- ", responseData.blast_efficiency);
    const responseObj = {
      status: 'SUCCESS',
      data: responseData,
    };
    return res.status(201).send(responseObj);
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
