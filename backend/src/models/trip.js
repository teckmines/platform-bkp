const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  rfid_tag_no: {
    type: String,
    required: true,
    trim: true,
  },
  trip_id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  mine_reg_no: {
    type: String,
    required: true,
  },
  calculated_volume: {
    type: mongoose.Schema.Types.Decimal128,
  },
  is_overloaded: {
    type: Boolean,
  },
  is_underloaded: {
    type: Boolean,
  },
  is_boulder_detected: {
    type: Boolean,
  },
  is_processed: {
    required: true,
    type: Boolean,
  },
  truck_image: {
    type: String,
  },
}, {
  timestamps: true,
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
