const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  _user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  type: { type: String, required: true},
  created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Token', tokenSchema);
