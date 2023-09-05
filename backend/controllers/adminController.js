const Admin = require("../models/admin");
const Agency = require("../models/agency");
const Location = require("../models/location")
const Booking = require("../models/booking")
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const postLoginAdmin = async (req, res) => {
  try {
    console.log("reached adminlogin");
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, "admin email");
    let adminData = await Admin.findOne({ email: email });
    console.log(adminData);

    if (adminData) {
      const passwordMatch = await bcrypt.compare(password, adminData.password);
      if (passwordMatch) {
        const token = jwt.sign({ _id: adminData._id },"secret")
        res.send({ message1: "success",token });
      } else {
        res.json({ message2: "Password Incorrect" });
      }
    } else {
      res.json({ message3: "E-mail or Password Incorrect" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAgencyData = async (req, res) => {
  const id = req.params.id
  console.log(id, "agencyid");
  const agencyData = await Agency.findById({ _id: id })
  console.log(agencyData);
  console.log(agencyData.services);
  const agencyDataPlain = agencyData.toObject();
  console.log(agencyDataPlain.services);
  

  res.json(agencyDataPlain);
  
}

const getAgencyApprove = async (req, res) => { 
  const email = req.params.email
  const agencyData = await Agency.findOne({ email: email })
  if (agencyData.adminApproved === false) {
    await Agency.findOneAndUpdate({ email: email }, { adminApproved: true });
    res.json({ message:"approved" });
  } else {
    await Agency.findOneAndUpdate({ email: email }, { adminApproved: false });
    res.json({message:"denied"});
  }

}

const locationDataPost = async (req, res) => { 
  try {
    console.log(req.file);
    console.log(req.body.locationName);
    const locationData = await Location.findOne({
      locationName: req.body.locationName,
    });
    if (!locationData) {
      const location = new Location({
        locationName: req.body.locationName,
        image: req.file.filename,
      });
      await location.save();
      res.json({ message1: "Location added successfully" })
      

    } else { 
      res.json({message2:"Location already added"})
    }
    

   

    
  } catch (error) {
    console.log(error);
    
  }
}

const getDashCounts = async (req, res) => { 
  try {
    const bookingCount = await Booking.find().countDocuments();
    const userCount = await User.find().countDocuments();
    const agencyCount = await Agency.find().countDocuments()
    const locationCount = await Location.find().countDocuments();

    const counts = {
      bookingCount,
      userCount,
      agencyCount,
      locationCount,
    };

    res.status(200).json({ status: true, counts });
    
    
  } catch (error) {
    console.log(error);
    
  }
}

const getBookingData = async (req, res) => { 
  try {
    Booking.find()
      .sort({ createdAt: -1 })
      .populate("userName")
      .populate("agencyName")
      .then((result) => {
        res.status(200).json({ status: true, result });
      })
      .catch((error) => {
       console.log(error);
      });
    
  } catch (error) {
    
  }
}

module.exports = {
  postLoginAdmin,
  getAgencyData,
  getAgencyApprove,
  locationDataPost,
  getDashCounts,
  getBookingData,
};
