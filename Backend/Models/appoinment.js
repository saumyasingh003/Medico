import mongoose from "mongoose";
import validator from "validator";

const AppointmentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required"],
    minlength: [3, "Username must be at least 3 characters"],
  },
  lastname: {
    type: String,
    required: [true, "lastname is required"],
    minlength: [3, "Username must be at least 3 characters"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    minlength: [10, "Phone must be exactly 10 characters"],
    maxlength: [10, "Phone must be exactly 10 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email",
    },
  },
  dob: {
    type: String,
    required: [true, "DOB Is Required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ["Male", "Female"],
  },
  date: {
    type: String,
    required: [true, "Date Is Required!"],
  },
  
  doctorFirstname: {
    type: String,
    required: [true, "Doctor's First Name Is Required!"],
  },
  doctorLastname: {
    type: String,
    required: [true, "Doctor's Last Name Is Required!"],
  },
  department: {
    type: String,
    required: [true, "Department Is Required!"],
  },
  hasVisited: {
    type: String,
    enum: ["Yes", "No"],
    default: "no",
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  // patientId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  address: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  status:{
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  }
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;

