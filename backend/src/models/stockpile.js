const mongoose = require('mongoose');

const stockpileSchema = new mongoose.Schema({
  stockpile_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    auto: true,
  }, // add fencing id in stockpile table and add fencing table
  stockpile_name: {
    type: String,
    required: true,
    trim: true,
  },
  material_sku: {
    type: String,
    required: true,
    trim: true,
  },
  mine_reg_no: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
  volume: {
    type: mongoose.Schema.Types.Decimal128,
    trim: true,
  },
  tonnage: {
    type: mongoose.Schema.Types.Decimal128,
    trim: true,
  },
  total_volume: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

const Material = mongoose.model('Stock', stockpileSchema);

module.exports = Material;
