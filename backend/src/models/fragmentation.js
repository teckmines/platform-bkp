const mongoose = require('mongoose');

const fragmentationSchema = new mongoose.Schema({
  frag_id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  blast_id: {
    type: String,
    required: true,
    trim: true,
  },
  mine_reg_no: {
    type: String,
    required: true,
  },
  is_captured: {
    type: Boolean,
    default: false,
  },
  is_processed: {
    type: Boolean,
    default: false,
  },
  blur: {
    type: mongoose.Schema.Types.Decimal128,
  },
  clahe_threshold: {
    type: mongoose.Schema.Types.Decimal128,
  },
  clahe_clip_limit: {
    type: mongoose.Schema.Types.Decimal128,
  },
  mosper_iteration: {
    type: mongoose.Schema.Types.Decimal128,
  },
  kernel: {
    type: mongoose.Schema.Types.Decimal128,
  },
  dilate_iteration: {
    type: mongoose.Schema.Types.Decimal128,
  },
  image_desc: {
    type: String,
    required: true,
  },
  blast_efficiency: {
    type: mongoose.Schema.Types.Decimal128,
  },
  x_axis_data: [{
    type: mongoose.Schema.Types.Decimal128,
  }],
  y_axis_data: [{
    type: mongoose.Schema.Types.Decimal128,
  }],
}, {
  timestamps: true,
});

const Fragmentation = mongoose.model('Fragmentation', fragmentationSchema);

module.exports = Fragmentation;
