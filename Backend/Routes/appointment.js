import express from 'express';
import { postAppointment , getAllAppointments} from "../Controllers/appointment.js"
import { CatchAsyncError } from "../Middlewares/CatchAsyncErrors.js";



const router= express.Router();

router.post("/send" , CatchAsyncError(postAppointment));
router.get("/view",  CatchAsyncError(getAllAppointments)); 




export default  router ;