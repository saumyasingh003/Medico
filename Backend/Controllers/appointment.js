import Appointment from "../Models/appoinment.js";
import Doctor from "../Models/doctor.js"; 
import { ErrorHandler } from "../Middlewares/ErrorHandler.js";

export const postAppointment = async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    dob,
    gender,
    date,
    department,
    doctorFirstname,
    doctorLastname,
    hasVisited,
    address,
  } = req.body;

  // List of required fields
  const requiredFields = {
    firstname,
    lastname,
    email,
    phone,
    dob,
    gender,
    date,
    department,
    doctorFirstname,
    doctorLastname,
    address,
  };

  // Find missing fields
  const missingFields = Object.keys(requiredFields).filter(
    (field) => !requiredFields[field]
  );

  // Return error if any fields are missing
  if (missingFields.length > 0) {
    return next(
      new ErrorHandler(
        `The following fields are required: ${missingFields.join(", ")}`,
        400
      )
    );
  }

  try {
    // Log the doctor search parameters
    console.log("Searching for doctor with parameters:", {
      firstname: doctorFirstname,
      lastname: doctorLastname,
      department: department,
    });

    // Search for the doctor in the Doctor model
    const doctor = await Doctor.findOne({
      firstname: doctorFirstname.trim(), 
      lastname: doctorLastname.trim(),
      doctorDepartment: department.trim(), 
    });

    // Log the found doctor or not
    // console.log("Found doctor:", doctor);

    if (!doctor) {
      return next(new ErrorHandler("Doctor not found", 404));
    }

    // Check if more than one doctor with the same name and department exists
    const doctorConflict = await Doctor.find({
      firstname: doctorFirstname.trim(),
      lastname: doctorLastname.trim(),
      doctorDepartment: department.trim(),
    });

    if (doctorConflict.length > 1) {
      return next(
        new ErrorHandler(
          "Doctors Conflict! Please Contact Through Email Or Phone!",
          400
        )
      );
    }

    const doctorId = doctor._id; // Get the ID of the found doctor

    // Create the appointment
    const appointment = await Appointment.create({
      firstname,
      lastname,
      email,
      phone,
      dob,
      gender,
      date,
      department,
      doctorId, // Store the doctor ID here
      hasVisited,
      address,
      doctorFirstname: doctorFirstname, // Store doctor's first name
      doctorLastname: doctorLastname, // Store doctor's last name
    });

    return res.status(200).json({
      success: true,
      message: "Appointment Sent Successfully!",
      appointment,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};


export const getAllAppointments = async (req, res, next) => {
  try {
    
    const appointments = await Appointment.find();

    // console.log("Retrieved appointments:", appointments);

    const numberOfAppointments = appointments.length;

   
    if (numberOfAppointments === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found",
        count: numberOfAppointments, 
      });
    }

    return res.status(200).json({
      success: true,
      count: numberOfAppointments, // Include the count of appointments
      appointments,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};