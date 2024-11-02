import express from 'express';
import {signup , login , logout , addNewAdmin , adminLogin} from '../Controllers/user.js';
import { CatchAsyncError } from "../Middlewares/CatchAsyncErrors.js";


const router= express.Router();

router.post("/signup" , CatchAsyncError( signup));
router.post("/login" , CatchAsyncError(login));
router.post("/logout", CatchAsyncError(logout));
router.post("/admin/addnew", CatchAsyncError(addNewAdmin));
router.post("/admin/login", CatchAsyncError( adminLogin));




export default  router ;