import mongoose from "mongoose";
import validator from "validator";

const doctorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required:  [true, "firstname is required"],
    minlength: [3, "Username must be at least 3 characters"],
  },
  lastname: {
    type: String,
    required:  [true, "lastname is required"],
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
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
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
  experience:{
        type:String,
        required: [true, "Experience is required"],
        minlength: [1, "Experience must be at least 1 year"],
  },
  doctorDepartment:{
    type: String,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;