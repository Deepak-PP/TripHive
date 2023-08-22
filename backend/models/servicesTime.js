const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSchema = new Schema({
  serviceName: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    
  },
  endTime: {
    type: String,
    
  },
  Description: {
    type: String,
    
  }
});

module.exports = mongoose.model("ServiceTime", timeSchema);
