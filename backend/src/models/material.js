const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    trim: true,
  },
  material_name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  density: {
    type: mongoose.Schema.Types.Decimal128,
    trim: true,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    trim: true,
  },
  currency: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
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

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;
