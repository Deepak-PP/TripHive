const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const agencySchema = new Schema({
  profielImage: {
    type: String,
  },
  agencyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  adminApproved: {
    type: Boolean,
    default: false,
  },
  services: [
    {
      serviceName: {
        type: String,
        required: true,
      },
      image: {
        type: Array,
        required: true,
      },
      time: {
        type: Schema.Types.ObjectId,
        ref: "ServiceTime",
      },
    },
  ],
  otherServices: [
    {
      otherServiceName: {
        type: String,
        required: true,
      },
    },
  ],
  maxCapacity: {
    type: Number,
  },
  pricePerHead: {
    type:Number
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model("Agency", agencySchema);
