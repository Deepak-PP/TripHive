
const { Router } = require("express");
const { uploadSingle } = require("../middlewear/multer")


const adminRoute = Router()




const adminControl = require("../controllers/adminController")

adminRoute.post("/loginAdmin", adminControl.postLoginAdmin);
adminRoute.get("/viewAgency/:id", adminControl.getAgencyData)
adminRoute.get("/approveAgency/:email", adminControl.getAgencyApprove)
adminRoute.post("/locations", uploadSingle, adminControl.locationDataPost);
adminRoute.get("/getcounts", adminControl.getDashCounts);
adminRoute.get("/bookingData",adminControl.getBookingData);


module.exports = adminRoute
