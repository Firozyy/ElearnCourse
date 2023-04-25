import mongoose from 'mongoose'

const schema = new mongoose.Schema({

    users:{
        type:Number,
        default:0
    }, 
    views:{
        type:Number,
        default:0
  
    }, 
    subsciption:{
        type:Number,
        default:0
  
    },

    createdAT: {
        type: Date,
        default: Date.now
    },
});


export const Stat = mongoose.model("stat", schema)