
const { Router } = require("express");
const { uploadArray } = require("../middlewear/multer")

const { uploadSingleProfileImage } = require("../middlewear/multer");




const agencyRoute = Router()
const agencyControl = require('../controllers/agencyController')

agencyRoute.post('/registerAgency', agencyControl.agencyRegister)
agencyRoute.get("/agencyVerify/:id/verify/:token", agencyControl.agentEmailVerify);
agencyRoute.post("/loginAgency", agencyControl.agencyLogin);
agencyRoute.get("/agencyData", agencyControl.getAgencyData);
agencyRoute.post(
  "/profileUpdate",
  uploadArray,
  agencyControl.agencyProfileUpdate
);
agencyRoute.post("/agencyServiceTime", agencyControl.serviceTimeData);
agencyRoute.post(
  "/profileImageAgency",
  uploadSingleProfileImage,
  agencyControl.agencyProfileImageUpload
);
agencyRoute.get("/bookingDetails",agencyControl.getBookingData);


module.exports = agencyRoute



