import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Doctor from "../Models/doctor.js";
import cloudinary from "cloudinary";
import { ErrorHandler } from "../Middlewares/ErrorHandler.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Add Doctor Controller
export const AddDoctor = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      dob,
      experience,
      gender,
      phone,
      email,
      password,
      doctorDepartment,
    } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const { avatar } = req.files;
    const allowedFormats = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/avif",
    ];
    if (!allowedFormats.includes(avatar.mimetype)) {
      return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    // Validate that the password is provided
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Request Body:", req.body);
    console.log("File received:", req.file);

    const cloudinaryResponse = await cloudinary.uploader.upload(
      avatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(
        new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
      );
    }
    console.log("Avatar URL :", avatar);
    // Create new doctor document
    const doctor = new Doctor({
      firstname,
      lastname,
      dob,
      experience,
      gender,
      phone,
      email,
      password: hashedPassword,
      doctorDepartment,
      avatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    await doctor.save();

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "Doctor registered successfully",
      doctor: {
        id: doctor._id,
        firstname: doctor.firstname,
        lastname: doctor.lastname,
        email: doctor.email,
        phone: doctor.phone,
        doctorDepartment: doctor.doctorDepartment,
        avatar: doctor.avatar,
        gender: doctor.gender,
        experience: doctor.experience,
        dob: doctor.dob,
      },
    });
  } catch (error) {
    console.log(error);
    // if (error.name === "ValidationError") {
    //   const errors = Object.values(error.errors).map((err) => err.message);
    //   return res.status(500).json({ success: false, errors });
    // }

    next(error);
  }
};

// Get All Doctors Controller
export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    const numberOfDoctors = doctors.length;

    res.status(200).json({
      success: true,
      numberOfDoctors,
      doctors,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get Doctors by Department Controller
export const getDoctorsByDepartment = async (req, res, next) => {
  try {
    const { department } = req.params;

    // console.log("Requested Department:", department);

    // Fetch doctors from the specified department (case-insensitive)
    const doctors = await Doctor.find({
      doctorDepartment: { $regex: new RegExp(`^${department}$`, "i") },
    });

    const numberOfDoctors = doctors.length;

    res.status(200).json({
      success: true,
      message: "Doctors retrieved successfully for the given department",
      numberOfDoctors,
      doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors by department:", error);
    next(error);
  }
};

// delete doctors
export const deleteDoctor = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const trimmedId = id.trim(); // Trim whitespace

    // Check if the trimmed ID is a valid ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(trimmedId)) {
      return next(new ErrorHandler("Invalid Doctor ID format", 400));
    }

    const doctor = await Doctor.findById(trimmedId); // Find doctor by ID

    if (!doctor) {
      return next(new ErrorHandler("Doctor not found", 404));
    }

    // Log the public_id to verify it before deletion
    // console.log("Public ID to delete:", doctor.avatar.public_id);

    // Check if avatar exists and delete it from Cloudinary
    if (doctor.avatar && doctor.avatar.public_id) {
      await cloudinary.uploader.destroy(doctor.avatar.public_id);
    }

    // Delete the doctor from the database
    await Doctor.findByIdAndDelete(trimmedId);

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("Error during deletion:", error);
    next(error);
  }
};
