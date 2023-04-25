import express from "express";
import { addcourseleture, deletCourse, deletlecture, getAllCourse, getcourseleture } from "../controlers/courseControl.js";
import { createCourse } from "../controlers/courseControl.js";
import singleupload from "../midlewares/multer.js";
import { SubscriberAuthanticate, adminAuthanticate, isAuthanticate } from "../midlewares/auth.js";
const router = express.Router();

//get all course without letures

router.route("/courses").get(getAllCourse);

//create cousrses new . only admin

router.route("/createcourse").post(isAuthanticate, adminAuthanticate, singleupload, createCourse);

router.route("/course/:id").get(isAuthanticate,SubscriberAuthanticate, getcourseleture)
    .post(isAuthanticate, adminAuthanticate, singleupload, addcourseleture)
    .delete(isAuthanticate, adminAuthanticate, deletCourse);

router.route("/lecture").delete(isAuthanticate, adminAuthanticate, deletlecture)

export default router;