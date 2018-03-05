var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  from: String,
  clientId : String,
  message: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('message', ChatSchema);