const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
  charge_id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  total_charge_used: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  number_of_primers: {
    type: Number,
    required: true,
  },
  number_of_detonators: {
    type: Number,
    required: true,
  },
  chagre_density: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  length: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  stemming: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  diameter: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  subdrilling: {
    type: Boolean,
    required: true,
  },
  angle: {
    type: String,
    required: true,
  },
  azimuth: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  water_in_hole: {
    type: Boolean,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Charge = mongoose.model('Charge', chargeSchema);

module.exports = Charge;
