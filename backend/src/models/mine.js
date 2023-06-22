const mongoose = require('mongoose');

const mineSchema = new mongoose.Schema({
  mine_name: {
    type: String,
    required: true,
    trim: true,
  },
  mine_reg_no: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  leasing_area: {
    type: String,
    required: true,
  },
  mine_region: {
    type: String,
    required: true,
  },
  mine_address: {
    type: String,
    required: true,
    trim: true,
  },
  mine_loc_lat: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  mine_loc_long: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  lease_validity: {
    type: Date,
    required: true,
  },
  mine_type: {
    type: String,
    required: true,
  },
  mine_material: {
    type: String,
    required: true,
  },
  land_type: {
    type: String,
    required: true,
  },
  rock_type: {
    type: String,
    required: true,
  },
  crusher_type: {
    type: String,
    required: true,
  },
  crusher_capacity: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  mine_addtnl_dtls: {
    type: String,
    trim: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, {
  timestamps: true,
});

const Mine = mongoose.model('Mine', mineSchema);

module.exports = Mine;
