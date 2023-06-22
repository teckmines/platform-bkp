const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  truck_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    auto: true,
  },
  rfid_tag_no: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  truck_number: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  truck_brand: {
    type: String,
    required: true,
    trim: true,
  },
  truck_model: {
    type: String,
    required: true,
    trim: true,
  },
  corresponding_volume: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  cutoff_value: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  truck_owner: {
    type: String,
    required: true,
    trim: true,
  },
  contractor_company: {
    type: String,
    trim: true,
  },
  contractor_pic: {
    type: String,
    trim: true,
  },
  contractor_address: {
    type: String,
    trim: true,
  },
  contractor_gstin: {
    type: String,
    trim: true,
  },
  contract_start_date: {
    type: Date,
  },
  contract_end_date: {
    type: Date,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  remarks: {
    type: String,
  },
  is_registered: {
    type: Boolean,
    default: false,
  },
  is_processsed_truck: {
    type: Boolean,
    default: false,
  },
  is_processsed_body: {
    type: Boolean,
    default: false,
  },
  is_processsed_head: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;
