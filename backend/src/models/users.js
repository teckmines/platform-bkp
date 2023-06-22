const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  user_type: {
    type: String,
    required: true,
    trim: true,
  },
  phone_no: {
    type: Number,
    required: true,
    trim: true,
  },
  id_prrof_name: {
    type: String,
    required: true,
    trim: true,
  },
  id_prrof_uid: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [{
    token: {
      type: String,
    },
  }],
}, {
  timestamps: true,
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
