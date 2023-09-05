const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute")
const agencyRoutes = require("./routes/agencyRoutes.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");




const app = express();
const http = require("http").createServer(app);
const initializeSocket = require("./socket/socket");
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());

app.use('/',routes);
app.use('/admin', adminRoutes);
app.use('/agency',agencyRoutes)

mongoose
  .connect("mongodb://127.0.0.1:27017/tripHive", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to the database");
})
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

   const server = http.listen(5020, () => {
     console.log("App is listening on port 5020");
   });

   // app.listen(5020, () => {
   //   console.log("App is listening on port 5020");
   // });
   initializeSocket(server);

 
