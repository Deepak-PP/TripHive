const mongoose = require('mongoose')
const Schema = mongoose.Schema

const connectionSchema = new Schema(
  {
    connections: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
      agency: {
        type: Schema.Types.ObjectId,
        ref: "Agency",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Connection", connectionSchema);