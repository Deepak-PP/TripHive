
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
agencyRoute.get("/bookingDetails", agencyControl.getBookingData);
agencyRoute.get("/agencyChatList", agencyControl.getAgencyChat)
agencyRoute.get("/findchat", agencyControl.findChat);
agencyRoute.post("/message", agencyControl.message);
agencyRoute.get("/getDashCount",agencyControl.getDashCountData);



module.exports = agencyRoute



