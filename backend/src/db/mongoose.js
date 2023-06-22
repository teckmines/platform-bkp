const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://localhost:localhost/services';
mongoose.connect(MONGODB_URL, {});
