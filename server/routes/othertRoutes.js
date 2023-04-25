import express from "express";
import { adminAuthanticate, isAuthanticate } from "../midlewares/auth.js";
import { contact, courseReques, getdashbordStats } from "../controlers/otherControl.js";

const router = express.Router();

//get all course without letures
//buy subscription


router.route("/contact").post(isAuthanticate,contact);
router.route("/courserequest").post(isAuthanticate,courseReques);


router.route("/coursereques").post(isAuthanticate,courseReques);


router.route("/admin/stats").get(isAuthanticate,adminAuthanticate,getdashbordStats)



export default router;