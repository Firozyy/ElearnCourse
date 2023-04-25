import  express  from "express";
import dotenv from 'dotenv';
import ErrerMiddleware from './midlewares/errer.js'
import cookieparser from "cookie-parser"
import cors from  'cors'

dotenv.config({path:'./config/.env'});

const app= express();
import path from "path"
const _dirname= path.dirname('')
const buildpath = path.join(_dirname ,"../cousebundler/build") ;

app.use(express.static(buildpath))

app.get('/',function( req, res)  {
    res.sendFile(path.join(buildpath));

})

//cors platform

app.use(cors({
    origin:process.env.frontend_url,
    credentials:true,
    methods:["GET","POST","DELETE","PUT",]

}))
app.use(cookieparser());

//using midleares
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
//importing use routes &routes
import course from './routes/courseRoute.js';
import user from './routes/userRoutes.js';
import payment from './routes/paymentRout.js'
import other from './routes/othertRoutes.js'
app.use("/api/v1",course);
app.use("/api/v1",user);
app.use("/api/v1",payment);
app.use("/api/v1",other);
export default app;
//import 
app.use(ErrerMiddleware);