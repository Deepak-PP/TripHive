const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchenma = new Schema({
  locationName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  agencies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Agency",
    },
    ],
});

module.exports = mongoose.model("Location", locationSchenma);