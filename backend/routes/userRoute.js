const cookieParser = require('cookie-parser')
const { Router } = require('express')

const userRoute = Router();
userRoute.use(cookieParser())

const userControl = require('../controllers/userController');
const user = require('../models/user');

userRoute.post('/register', userControl.postReg)
userRoute.get('/:id/verify/:token', userControl.emailVerify)
userRoute.post('/login', userControl.postLogin)
userRoute.post("/user", userControl.getUser);
userRoute.post("/loginGoogle", userControl.googelLogin)
userRoute.get("/locations", userControl.locationData)
userRoute.get("/locationDetails/:id", userControl.viewLocationDetail);
userRoute.get("/getAgencyData/:id", userControl.getAgencyDataservcies);
userRoute.post("/submitBooking", userControl.postBookingData);
userRoute.post("/verifyPayment", userControl.paymentVerify);
userRoute.get("/bookingData/:id", userControl.getBookingData);
userRoute.get("/getBookingDetails",userControl.userBookingDataFetch);



module.exports = userRoute