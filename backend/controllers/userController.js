require("dotenv").config();
const User = require("../models/user");
const Location = require("../models/location")
const Agency = require("../models/agency");
const Booking = require("../models/booking")
const Connection = require('../models/connection')
const Message = require('../models/message')
const bcrypt = require("bcrypt");
const Token = require("../models/token");
const sendEMail = require("../util/sendEmail");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const jwtDecode = require("jwt-decode");


const { log } = require("console");
const { read } = require("fs");

const postReg = async (req, res) => {
  try {

    let email = req.body.email;
    let name = req.body.displayname;
    let password = req.body.password;
    
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    let user = await User.findOne({ email: email });
  console.log(user);
    if (user) {
 
      if (!user.verified) {
        const token = await Token.findOne({ userId: user._id });
        if (!token) {
          const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          });
          const tokenData = await token.save();

          const url = `${process.env.FRONT_URL}/${user._id}/verify/${tokenData.token}`;

          await sendEMail(user.email, "Verify Email", url);
          return res.json({ message: "Sent for verification" });
        } else { 
          let tokenPresent = await Token.findOne({ userId: user._id });
          await Token.deleteOne({ _id: tokenPresent._id });
          const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          });
          const tokenData = await token.save();

          const url = `${process.env.FRONT_URL}/${user._id}/verify/${tokenData.token}`;

          await sendEMail(user.email, "Verify Email", url);
          return res.json({ message: "Sent for verification" });

        }
        
     
      } else {
      
        return res.json({ message: "Email is already registered" });
      }
        
    } else { 
        user = new User({
          name: name,
          email: email,
          password: hashpassword,
        });
        const userData = await user.save();
        console.log("saved to database", userData._id);

        const token = await new Token({
          userId: userData._id,
          token: crypto.randomBytes(32).toString("hex"),
        });
        const tokenData = await token.save();
        console.log(tokenData);

        console.log(tokenData, "this is tokken");

        const url = `${process.env.FRONT_URL}/${user._id}/verify/${tokenData.token}`;

        await sendEMail(user.email, "Verify Email", url);

        res.status(201).send({
          message: "An Email has been sent to your account, Please verify",
        });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const emailVerify = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).send({ message: "Invalid link" });
    }

    await User.findByIdAndUpdate({ _id: user._id }, {verified: true });
    await Token.deleteOne({ _id: token._id });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error);
  }
};

const postLogin = async (req, res) => {
  try {
  
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({ email: email });
    
    if (userData) {
      console.log(userData);
      const token = await Token.findOne({ userId: userData._id });

      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (passwordMatch) {
        if (!userData.verified) {
          const token = await Token.findOne({ userId: userData._id });
          if (!token) {
            const token = await new Token({
              userId: userData._id,
              token: crypto.randomBytes(32).toString("hex"),
            })
            const tokenData = await token.save();

            const url = `${process.env.FRONT_URL}/${userData._id}/verify/${tokenData.token}`;
            await sendEMail(userData.email, "Verify Email", url);
            return res.json({ message3: "Your account has not been verified. We have sent the verifivation link to your email" });
          } else{ 
            let tokenPresent = await Token.findOne({ userId: userData._id });
            await Token.deleteOne({ _id: tokenPresent._id });
             const token = await new Token({
               userId: userData._id,
               token: crypto.randomBytes(32).toString("hex"),
             });
             const tokenData = await token.save();

             const url = `${process.env.FRONT_URL}/${userData._id}/verify/${tokenData.token}`;
             await sendEMail(userData.email, "Verify Email", url);
             return res.json({
               message3:
                 "Your account has not been verified. We have sent the verification link to your email",
             });
          }
        
        }

        const token = jwt.sign({ _id: userData._id }, "secret");

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
const getUser = async (req, res) => {
  try {
    console.log("reached getuser");
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the authorization header
    console.log("token", token);

    const claims = jwt.verify(token, "secret");
    console.log(claims, "this is claims");

    if (!claims) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }

    console.log("reaching here");
    const user = await User.findOne({
      _id: claims._id,
    });
    console.log("also reaching here");
    console.log(user);
    const { password, ...data } = user.toJSON();

    res.send(data);
  } catch (error) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
}


 
const googelLogin = async (req, res) => {
  try {
    const decoded = jwtDecode(req.body.credential) 
    const email = decoded.email;
    const userData = await User.findOne({ email: email })
    if (userData) {
      const token = jwt.sign({ _id: userData._id }, "secret");
      res.send({ message: "success Login", token });
    } else { 
      const salt = await bcrypt.genSalt(10) 
      const hashpassword = await bcrypt.hash(decoded.name, salt)
      const user = new User({
        name: decoded.name,
        email: decoded.email,
        password: hashedPassword,
      })
      await user.save()
      user.verified = true
      const token = jwt.sign({ _id: user._id }, "secret")
      res.send({message:"successfully registered"})
    }
    
  } catch (error) {
    console.log(error);
    
  }

  

} 

const locationData = async (req, res) => {
  try {
    console.log("location");
    const locationData = await Location.find({})
    console.log(locationData,"sdjkfhsdkjfhsdjk");
  
    res.json(locationData)
    
  } catch (error) {}
};

const viewLocationDetail = async (req, res) => { 
  try {
    const id = req.params.id
    console.log(id);
    const locationData = await Location.findById({ _id: id }).populate('agencies')
    console.log(locationData)
    res.json(locationData)
    
  } catch (error) {
    
  }
}

const getAgencyDataservcies = async (req, res) => { 
  try {
   
    const id = req.params.id
    const agencyData = await Agency.findById({ _id: id }).populate('services.time')
   
    res.json(agencyData);
    
  } catch (error) {
    console.log(error);
    
  }
}

const postBookingData = async (req, res) => { 
  try {
    console.log("hererepostbookingg");
    const email = req.body.email
    const noOfTravellers = req.body.noOfTravellers
    const dateOfTravel = req.body.dateOfTravel
    const specialRequests = req.body.specialRequests
    const agencyId = req.body.agencyId
    const paymentStatus = req.body.paymentStatus
   
    const userData = await User.findOne({ email: email })
    const agencyData = await Agency.findById({
      _id: agencyId
    })
console.log("postbookingbefore");
    const existingBooking = await Booking.findOne({
       userName: userData._id,
       agencyName: agencyData._id,
       dateOfTravel: dateOfTravel,
     });
    if (existingBooking) {
      console.log("existing");
      console.log("postbookingafter");
       res.json({ message: "You have already made a booking for this date" });
    } else { 
          const bookings = new Booking({
            userName: userData._id,
            agencyName: agencyData._id,
            noOftravellers: noOfTravellers,
            dateOfTravel: dateOfTravel,
            specialRequests: specialRequests,
            paymentStatus: paymentStatus,
            bookingStatus:"processed",
          });

          const bookingData = await bookings.save();
          console.log(bookingData);
          res.json(bookingData._id);

    }
    
  } catch (error) {
    console.log(error);
    
  }
}

const paymentVerify = async (req, res) => { 
  try {
    console.log(req.body, "reached verifypayment");
    const paymentId = req.body.response.razorpay_payment_id;
    const statusCode = req.body.response.status_code;
    const bookingId = req.body.bookingId;
    const totalAmount = req.body.totalAmount
    const totalAmountdatabase = totalAmount/100
    console.log(paymentId, statusCode, bookingId);

    if (paymentId && bookingId) {
      await Booking.findByIdAndUpdate(bookingId, {
        paymentId: paymentId,
        totalAmount: totalAmountdatabase,
      });

      if (statusCode === 200) {
        await Booking.findByIdAndUpdate(bookingId, {
          paymentStatus: "Completed",
        });
        res.json({ message: "Payment Successfull" })
        
      } else {
         await Booking.findByIdAndUpdate(bookingId, {
           paymentStatus: "Failed",
         });
        res.json({ message: "Payment failed" })
      }
    } else {
      res.status(400).json({ error: 'Invalid payment data.' });
    }
    
    
  } catch (error) {
    console.log(error);
    
  }
}
const getBookingData = async (req, res) => { 
  try {
    console.log("bookingcollectionget");
    const id = req.params.id
    console.log(id);
    const bookingData = await Booking.findById({ _id: id })
      .populate("userName")
      .populate("agencyName");

    res.json( bookingData );
    
  } catch (error) {
    console.log(error);
    
  }
}

const getBookingView = async (req, res) => { 
  try {
    const date = req.query.date
    console.log(date, "this is hte date");
    const bookingData = await Booking.findOne ({ dateOfTravel: date })
      .populate("agencyName")
      .populate("userName");
    console.log(bookingData);

    res.json(bookingData);
    
  } catch (error) {
    console.log(error);
    
  }
}

const userBookingDataFetch = async (req, res) => { 
  try {
         console.log("herererebookinggggg", req.headers);
         const token = req.headers.authorization.split(" ")[1];
         console.log(token, "tokenrecievedd");
         const decodedToken = jwt.verify(token, "secret");
         console.log(decodedToken, "decodedd");

         const userId = decodedToken._id
    console.log(userId, "userIdidd");
    const userBookingData = await Booking.find({ userName: userId })
      .populate("userName")
      .populate("agencyName");
    console.log(userBookingData, "bookingdataatata");

    res.json(userBookingData);

    
  } catch (error) {
    
  }
}

const bookingCancel = async (req, res) => { 
  try {
    const bookingId = req.query.id
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingStatus = "cancelled"
    await booking.save();

    res.status(200).json({ message: "Booking canceled successfully" });

    
  } catch (error) {

    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while canceling the booking" });
    
  }
}

const userChats = async (req, res) => { 
  try {
    console.log("here");
    const agencyId = req.query.id
     const token = req.headers.authorization?.split(" ")[1];
     const claims = jwt.verify(token, "secret");
     if (!claims) {
       return res.status(401).send({
         message: "unauthenticated",
       });
    }
    const userConnection = await Connection.find({
      "connections.user": claims._id,
      "connections.agency": agencyId,
    }).populate("connections.agency");
    if (userConnection ) {
      console.log(userConnection, "data fetched");
      res.json({ data: userConnection, id: claims._id });

    }
    
  } catch (error) {
    console.log(error);
    
  }
}

const allMessages = async (req, res) => { 
  try {
     const token = req.headers.authorization?.split(" ")[1];
     const agencyId = req.query.id;
     const claims = jwt.verify(token, "secret");
     if (!claims) {
       return res.status(401).send({
         message: "unauthenticated",
       });
    }
    
    const userId = claims._id;
    console.log(userId,agencyId);
    const findconnection = await Connection.findOne({
      "connections.user": userId,
      "connections.agency": agencyId,
    })
      .populate("connections.agency")
      .populate("connections.user");
     if (findconnection) {
       const allmessages = await Message.find({
         connectionid: findconnection._id,
       }).sort("createdAt");
       res.json({
         result: allmessages,
         cid: findconnection._id,
         userid: findconnection.connections.user,
       });
     } else {
       res.status(404);
     }

    
  } catch (error) {
    console.log(error);
    
  }
}

const addMessage = async (req, res) => { 
  try {
    const datas = req.body;
    const result = new Message({
      connectionid: datas.connectionid,
      from: datas.from,
      to: datas.to,
      message: datas.message,
    });
    const data = await result.save();
    res.json(data);
    
    
  } catch (error) {
    console.log(error);
    
  }
}

const connectionMake = async (req, res) => { 
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const claims = jwt.verify(token, "secret");
    const agencyId = req.query.id
    
     const connection = {
       user: new ObjectId(claims._id),
       agency: new ObjectId(agencyId),
    };
   
    if (!claims) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }
    const userConnection = await Connection.findOne({
      "connections.user": claims._id,
      "connections.agency": agencyId,
    }).populate("connections.agency");
    if (userConnection) {
      
      res.status(200).json({ newConnection: userConnection, status: true });
    } else { 
     
      const newConnection = new Connection({
        connections: {
          user: connection.user,
          agency: connection.agency,
        },
      });
      await newConnection.save();
      res.status(200).json({ newConnection, status: true });
    }

    
  } catch (error) {
    console.log(error);
    
  }
}



module.exports = {
  postReg,
  emailVerify,
  postLogin,
  getUser,
  googelLogin,
  locationData,
  viewLocationDetail,
  getAgencyDataservcies,
  postBookingData,
  bookingCancel,
  paymentVerify,
  getBookingData,
  userBookingDataFetch,
  userChats,
  allMessages,
  addMessage,
  connectionMake,
  getBookingView,
};
