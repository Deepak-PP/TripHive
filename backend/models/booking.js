const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchenma = Schema(
  {
    userName: {
      type: Schema.Types.ObjectId,
       ref: "Users",
     },
     agencyName: {
       type: Schema.Types.ObjectId,
       ref: "Agency",
     },
     noOftravellers: {
       type: Number,
       required: true,
     },
     dateOfTravel: {
       type: Date,
       required: true,
     },
     specialRequests: {
     type:String
     }, 
     paymentMethod: {
      type: String,
      required: false,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
     
    },
    paymentId: {
      type:String
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchenma);
