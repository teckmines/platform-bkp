const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  driving_license: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
  assigned_truck_number: {
    type: String,
    trim: true,
  },
  user_id: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
