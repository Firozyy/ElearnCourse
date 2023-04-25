import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { catchasyncerrer } from "./catchadyncErrer.js";
import { User } from "../model/User.js";

export const isAuthanticate = catchasyncerrer(async (req, res, next) => {
 
    const {token}=req.cookies;
    

 if(!token){
    return next(new ErrorHandler('no token/not logined',401)) 
 };

 const decoded = jwt.verify(token,process.env.secreKey);

 req.user= await User.findById(decoded._id);

next();

});

export const adminAuthanticate =  (req,res,next) => {
   if(req.user.role != "admin"){
      return next(new ErrorHandler(`${req.user.role} can't create COURSES` ,403));
     
   }
   next();
};

export const SubscriberAuthanticate =  (req,res,next) => {
   if(req.user.subscription.status != "active"  && req.user.role != "admin"){
      return next(new ErrorHandler(`only subscribers can access this resources` ,403));
     
   }
   next();
};