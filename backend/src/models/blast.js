const mongoose = require('mongoose');

const blastSchema = new mongoose.Schema({
  blast_id: {
    type: String,
    required: true,
    trim: true,
  },
  no_of_holes: {
    type: Number,
    required: true,
    trim: true,
  },
  spacing: {
    type: String,
    required: true,
    trim: true,
  },
  blast_pattern: {
    type: String,
    trim: true,
  },
  mine_reg_no: {
    type: String,
    required: true,
    trim: true,
  },
  blasting_incharge: {
    type: String,
    required: true,
    trim: true,
  },
  burden: {
    type: String,
    required: true,
    trim: true,
  },
  depth_of_holes: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    trim: true,
  },
  stemming_length: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    trim: true,
  },
  no_of_detonators: {
    type: Number,
    required: true,
    trim: true,
  },
  no_of_nonels: {
    type: Number,
    required: true,
    trim: true,
  },
  bench: {
    type: String,
    trim: true,
  },
  delay_type: {
    type: String,
    trim: true,
  },
  charge_per_delay: {
    type: String,
    trim: true,
  },
  latitude: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  longitude: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  explosive_charge: {
    type: String,
    trim: true,
  },
  drilling_pattern: {
    type: String,
    trim: true,
  },
  blast_date_time: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const Blast = mongoose.model('Blast', blastSchema);

module.exports = Blast;
