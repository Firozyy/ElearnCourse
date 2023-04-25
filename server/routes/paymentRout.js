import express from "express";
import { isAuthanticate } from "../midlewares/auth.js";
import { buySubsriptiion, cancelSubscription, getrazarPayKEy, paymentVerification } from "../controlers/paymentControl.js";

const router = express.Router();

//get all course without letures
//buy subscription


router.route("/subscribe").get(isAuthanticate,buySubsriptiion);
router.route("/paymentverification").post(isAuthanticate,paymentVerification);
router.route("/subscribe/cancel").delete(isAuthanticate,cancelSubscription);
router.route("/razorpaykey").get(getrazarPayKEy,getrazarPayKEy);


export default router;