const Agency = require("../models/agency");
const Booking = require("../models/booking")
const Location = require("../models/location");
const ServiceTime = require("../models/servicesTime")
const sendEMail = require("../util/sendEmail");
const Connection = require("../models/connection");
const Message = require("../models/message");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { ObjectId } = require("mongodb");

const agencyRegister = async (req, res) => {
  try {
    console.log("herererererererer");
    let email = req.body.email;
    let name = req.body.agencyName;
    let password = req.body.password;
    console.log(email, name, password);
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    let agency = await Agency.findOne({ email: email });
    console.log(agency);
    if (agency) {
      if (!agency.verified) {
        const token = await Token.findOne({ userId: agency._id });
        if (!token) {
          const token = await new Token({
            userId: agency._id,
            token: crypto.randomBytes(32).toString("hex"),
          });
          const tokenData = await token.save();
          console.log(tokenData);
          const url = `${process.env.FRONT_URL}/agencyVerify/${agency._id}/verify/${tokenData.token}`;

          await sendEMail(agency.email, "Verify Email", url);
          return res.json({
            message:
              "Your account has not been verified. We have sent the verification link to your email",
          });

        } else { 
           let tokenPresent = await Token.findOne({ userId: agency._id });
          await Token.deleteOne({ _id: tokenPresent._id });
           const token = await new Token({
             userId: agency._id,
             token: crypto.randomBytes(32).toString("hex"),
           });
           const tokenData = await token.save();
           console.log(tokenData);
           const url = `${process.env.FRONT_URL}/agencyVerify/${agency._id}/verify/${tokenData.token}`;

           await sendEMail(agency.email, "Verify Email", url);
           return res.json({
             message:
               "Your account has not been verified. We have sent the verification link to your email",
           });
        }
       
      } else {
        return res.json({ message: "Email is already registered" });
      }
    } else {
     
      agency = new Agency({
        agencyName: name,
        email: email,
        password: hashpassword,
      });
     
      const agencyData = await agency.save();
       
      console.log("saved to database", agencyData._id);

      const token = await new Token({
        userId: agencyData._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      const tokenData = await token.save();
      console.log(tokenData);

      console.log(tokenData, "this is tokken");

      const url = `${process.env.FRONT_URL}/agencyVerify/${agency._id}/verify/${tokenData.token}`;

      await sendEMail(agency.email, "Verify Email", url);

      res.json({
        message:
          "An Email has been sent to your account, Please verify to complete registration",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const agentEmailVerify = async (req, res) => {
  try {
    const agent = await Agency.findOne({ _id: req.params.id });
    if (!agent) {
      return res.json({ message: "NoAccount" });
    }
    const token = await Token.findOne({
      userId: agent._id,
      token: req.params.token,
    });
    if (!token) {
      return res.json({ message: "Invalid link" });
    }

    await Agency.updateOne({ _id: agent._id, verified: true });
    await Token.deleteOne({ _id: token._id });

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};

const agencyLogin = async (req, res) => {
  try {
    console.log("agency log in");
    const email = req.body.email;
    const password = req.body.password;

    const agencyData = await Agency.findOne({ email: email });
    if (agencyData) {
      console.log(agencyData);

      const passwordMatch = await bcrypt.compare(password, agencyData.password);

      if (passwordMatch) {
        if (!agencyData.verified) {
          let token = await Token.findOne({ userId: agencyData._id });
          if (!token) {
            const token = await new Token({
              userId: agencyData._id,
              token: crypto.randomBytes(32).toString("hex"),
            });
            const tokenData = await token.save();

            const url = `${process.env.FRONT_URL}/agencyVerify/${agencyData._id}/verify/${tokenData.token}`;
            await sendEMail(agencyData.email, "Verify Email", url);
            return res.json({
              message3:
                "Your account has not been verified. We have sent the verifivation link to your email",
            });
          } else {
            let tokenPresent = await Token.findOne({ userId: agencyData._id });
            await Token.deleteOne({ _id: tokenPresent._id });
            const token = await new Token({
              userId: agencyData._id,
              token: crypto.randomBytes(32).toString("hex"),
            });
            const tokenData = await token.save();

            const url = `${process.env.FRONT_URL}/agencyVerify/${agencyData._id}/verify/${tokenData.token}`;
            await sendEMail(agencyData.email, "Verify Email", url);
            return res.json({
              message3:
                "Your account has not been verified. We have sent the verifivation link to your email",
            });
          }
        }
       
        const createAgencyToken = (agencyId) => {
          const payload = {
            _id: agencyId,
            role: "agency", // Set the role to "agency" for agency tokens
          };
         
          const secret = "secret"; // Replace with your secret key
          return jwt.sign(payload, secret);
        };

       const token =  createAgencyToken(agencyData._id);

        // const token = jwt.sign({ _id: agencyData._id }, "secret");

        res.send({ message: "success login", token });
      } else {
        res.json({ message1: "Password Incorrect" });
      }
    } else {
      res.json({ message2: "Email or password Incorrect" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};

const getAgencyData = async (req, res) => {
  try {
    console.log("hererere", req.headers);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token, "tokenrecievedd");
    const decodedToken = jwt.verify(token, "secret");
    console.log(decodedToken,"decodedd");

    const agencyId =  decodedToken._id
    console.log(agencyId,"idd");
    const agencyData = await Agency.findById({
      _id: agencyId,
    });
    

    if (!agencyData) {
      return res.json({ message: "Agency data not received" });
    }

    // Send the agency data as part of the response
    res.json(agencyData);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error" });
  }
};


const agencyProfileUpdate = async (req, res) => {
  try {
  
    const formData = req.body
   

    let name = req.body.agencyName;
    let email = req.body.email;
    let location = req.body.location;
    let capacity = req.body.capacity;
    let pricePerHead = req.body.pricePerHead
    let services = req.body.services;
    let otherServices = req.body.otherServices;
    
    console.log(services, "this is services");
 

    // const serviceData = [];

    // // Iterate over the services array directly to get the serviceName and index
    // services.forEach((serviceName, index) => {
    //   const serviceImages = req.files
    //     .filter((file) => file[index].fieldname === 'image')
    //     .map((file) => file.filename);

    //   const imageNames = serviceImages.join(",");

    //   const serviceObject = {
    //     serviceName: serviceName,
    //     image: imageNames,
    //   };
    //   serviceData.push(serviceObject);
    // });

        const serviceData = [];

        for (let i = 0; i < services.length; i++) {
          const file = req.files[i];

          // You can use the index 'i' to associate the image with the corresponding service
          const serviceName = req.body.services[i]; // Assuming 'services' contains the service names
          const serviceImages = req.files.filter((file) =>
            file.originalname.includes(serviceName)
          );
          const imageName = serviceImages.map((file) => file.filename); // This will give you the path to the uploaded image

          // Do any additional processing or validation if needed

          const serviceObject = {
            serviceName: serviceName,
            image: imageName,
          };

          // Instead of pushing the whole service object to the services array,
          // just push the serviceName and image properties
          serviceData.push({
            serviceName: serviceName,
            image: imageName,
          });
        }

        console.log(serviceData, "serviceData backend");
  for (const service of serviceData) {
    await Agency.updateOne(
      {
        email: email,
        "services.serviceName": service.serviceName,
      },
      {
        $set: {
          "services.$.image": service.image,
        },
      }
    );

    await Agency.updateOne(
      {
        email: email,
        "services.serviceName": { $ne: service.serviceName },
      },
      {
        $addToSet: {
          services: {
            serviceName: service.serviceName,
            image: service.image,
          },
        },
      }
    );
  }

    const otherServicesData = req.body.otherServices.map((otherServiceName) => {
      return { otherServiceName: otherServiceName };
    });

    await Agency.findOneAndUpdate(
      { email: email }, // Use 'email' to find the document
      {
        agencyName: name,
        email: email,
        location: location,
        maxCapacity: capacity,
        pricePerHead:pricePerHead,
        otherServices: otherServicesData,
      }
    );

    console.log("hereiussnhj");
    const agencyData = await Agency.findOne({ email: email })
    const locationData = await Location.findOne({ locationName: location });
    console.log(locationData, "this is the selected location");

    if (locationData) {
      if (!locationData.agencies.includes(agencyData._id)) {
        console.log("here", agencyData._id);
        await Location.findOneAndUpdate(
          { locationName: location },
          { $push: { agencies: agencyData._id } }
        );
      }
    }

    if (agencyData.adminApproved === false) {
      res.json({
        message:
          "Your Profile is saved successfully. You can start once profile has been accepted",
      });
    } else {
      res.json({
        message: "Your Profile has been updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating" });
  }
};

const serviceTimeData = async (req, res) => { 
  try {
    console.log(req.body.serviceName);
    if (req.body.startTime && req.body.endTime) {
      const serviceTime = new ServiceTime({
        serviceName: req.body.serviceName,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        Description:req.body.Description
      });
      await serviceTime.save();

      const serviceTimeData = await ServiceTime.findOne({
        serviceName: req.body.serviceName,
      });
      if (!serviceTimeData) {
        return res.status(404).json({ error: "Service time not found." });
      }

      await Agency.updateMany(
        { "services.serviceName": req.body.serviceName }, // Find agencies with matching service name
        { $set: { "services.$.time": serviceTimeData._id } } // Update the time field
      );

      res.json({ message: "Data saved successfully" });
    } else if (req.body.Description) {
      await ServiceTime.findOneAndUpdate(
        { serviceName: req.body.serviceName },
        { Description: req.body.Description }
      );

      res.json({ message: "Description updated successfully" });
    } else {
      res.status(400).json({ error: "Invalid request." });
    }
    

    
  } catch (error) {
    console.log(error);
    
  }
}

const agencyProfileImageUpload = async (req, res) => { 
  try {
    console.log(req.file.filename);
    console.log(req.body.agencyId);

    const profileImage = req.file.filename
    const agencyId = req.body.agencyId
    const agencyData = await Agency.findByIdAndUpdate(
      { _id: agencyId },
      { profielImage: profileImage }
    );

    res.json({message:"Profile Image updated"})

    
  } catch (error) {
    console.log(error);
    
  }
}

const getBookingData = async (req, res) => { 
  try {
     
     const token = req.headers.authorization.split(" ")[1];
  
     const decodedToken = jwt.verify(token, "secret");
     console.log(decodedToken, "decodedd");

     const agencyId = decodedToken.role === "agency" ? decodedToken._id : null;
    console.log(agencyId, "idd");
    
    const bookingData = await Booking.find({ agencyName: agencyId })
      .populate("userName")
      .populate("agencyName")
    console.log(bookingData, "bookingdataatata");
    res.json(bookingData);

    
  } catch (error) {
    
  }
}

const getAgencyChat = async (req, res) => { 
  try {
    console.log("here");
    const token = req.headers.authorization?.split(" ")[1];
    const claims = jwt.verify(token, "secret");
    if (!claims) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }
    const agencyConnection = await Connection.find({
      "connections.agency": claims._id,
    }).populate("connections.user");
    if (agencyConnection) {
      console.log(agencyConnection, "data fetched");
      res.json({ data: agencyConnection, id: claims._id });
    }
    
  } catch (error) {
    console.log(error);
    
  }

  
}

const findChat = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const userId = req.query.id;
    const claims = jwt.verify(token, "secret");
    if (!claims) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }
    const agencyId = claims._id;
    const findconnection = await Connection.findOne({
      "connections.user": userId,
      "connections.agency": agencyId,
    });
    if (findconnection) {
      const allmessages = await Message.find({
        connectionid: findconnection._id,
      }).sort("createdAt");
      res.json({
        result: allmessages,
        cid: findconnection._id,
        prof: findconnection.connections.agency,
      });
    } else {
      res.status(404);
    }

  } catch (error) {
    console.log(error);
  }
};

const message = async (req, res) => { 
  try {
    console.log("reached message");
    const datas = req.body;
    console.log(datas,"req.body");
    const result = new Message({
      connectionid: datas.connectionid,
      from: datas.from,
      to: datas.to,
      message: datas.message,
    });
    const data = await result.save();
    console.log(data,"backendmessagedatatata");
    res.json(data);
    
    
  } catch (error) {
    console.log(error);
    
  }
}

const getDashCountData = async (req, res) => { 
  try {
    console.log("doc countcoutncoutnsklfjhsdlkj");
     const token = req.headers.authorization?.split(" ")[1];
     const claims = jwt.verify(token, "secret");
     if (!claims) {
       return res.status(401).send({
         message: "unauthenticated",
       });
    }
    const agencyId = claims._id
    const bookingData = await Booking.find({ agencyName: agencyId }).populate('userName').populate('agencyName')
    console.log(bookingData,"this is the booking data of this agency");                                                                                                 
    const bookingCount = await Booking.countDocuments({ agencyName: agencyId });
    console.log(bookingCount, "countcounty");
    const agencyData = await Agency.findById({ _id: agencyId });
   
    const result = await Booking.aggregate([
      {
        $match: {
          agencyName: new mongoose.Types.ObjectId(agencyId), // Convert agencyId to ObjectId
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]).exec();

    if (result.length === 0) {
      console.log("herereached resultt");
      return res
        .status(404)
        .json({ message: "No bookings found for the agency" });
    }

    const totalAmount = result[0].totalAmount;
    console.log(totalAmount, "this is the total collection ");

    res
      .status(200)
      .json({ totalAmount, bookingCount, agencyData, bookingData });


    
  } catch (error) {
     console.log("herereached errr");
     console.error(error, "this is error");
    
  }
}


module.exports = {
  agencyRegister,
  agentEmailVerify,
  agencyLogin,
  getAgencyData,
  agencyProfileUpdate,
  serviceTimeData,
  agencyProfileImageUpload,
  getBookingData,
  getAgencyChat,
  findChat,
  message,
  getDashCountData,
};
