
import mongoose from "mongoose";
export const conectDb =()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(data => {console.log(`conected wit ${data.connection.host}`);})
    .catch(e => {console.log("conenction problem");})
}
