const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = Schema({
  serviceName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  otherServices: [
    {
      otherServiceName: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Package", packageSchema);
