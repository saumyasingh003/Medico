import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: [3, "FirstName must be of atleast 3 characters"],
  },
  lastname: {
    type: String,
    required: true,
    minlength: [3, "LastName must be of atleast 3 characters"],
  },
  message: {
    type: String,
    required: true,
    minlength: [10, "Message must be of atleast 10 characters"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minlength: [10, "Phone must be at least 10 characters!"],
    maxlength: [10, "Phone must be at least 10 characters!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Message = mongoose.model("Message", messageSchema);
export default Message;
