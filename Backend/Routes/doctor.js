import express from "express";
import { CatchAsyncError } from "../Middlewares/CatchAsyncErrors.js";
import {
  AddDoctor,
  getAllDoctors,
  deleteDoctor,
  getDoctorsByDepartment

} from "../Controllers/doctor.js";

import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();
router.post(
  "/addDoctor",(req, res, next) => {
// console.log("Request Body:", req.body);
    // console.log("File Received:", req.file);
    next();
  },
  CatchAsyncError(AddDoctor)
);
router.get("/viewDoctor", CatchAsyncError(getAllDoctors));
router.delete("/deleteDoctor/:id", CatchAsyncError(deleteDoctor));
router.get('/department/:department', getDoctorsByDepartment);


export default router;
