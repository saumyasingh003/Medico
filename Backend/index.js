import express from "express";
const app = express();4
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import { ErrorMiddleware } from "./Middlewares/Errormiddleware.js";
import  messageRouter from "./Routes/message.js";
import userRouter from "./Routes/user.js";
import doctorRouter from "./Routes/doctor.js";
import appointmentRouter from "./Routes/appointment.js";




dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(fileUpload({useTempFiles : true , tempFileDirectory : true}));


const PORT = process.env.PORT;

const mongoURI =`${process.env.MONGO_URI}`;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Database connected!!");
  })
  .catch((error) => {
    console.log("Error connecting to the database:");
    console.error(error);
  });

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



  app.use('/message' , messageRouter);
  app.use('/user' , userRouter);
  app.use('/doctor' , doctorRouter);
  app.use('/appointment' , appointmentRouter);


  app.use(ErrorMiddleware);
// Basic route
app.get("/", (req, res) => {
  res.send("Hello Saumya!");
});

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);  
});
