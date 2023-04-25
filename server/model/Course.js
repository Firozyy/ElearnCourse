import mongoose from 'mongoose'
const schema = new mongoose.Schema({
    title: {
        type: String,
        requires: [true, 'please enter course title'],
        minlength: [4, 'title must be at least 4 charecters'],
        maxlength: [20, 'title must be at least 20 charecters'],
    },
    discription: {
        type: String,
        requires: [true, 'please enter course title'],
        minlength: [4, 'title must be at least 4 charecters'],
    },
    lectures: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            video: {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        },
    ],
    poster: {
        public_id: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        },
    },
    views: {
        type: Number,
        default: 0
    }, noOfvideos: {
        type: Number,
        default: 0
    },
    catagory: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: [true, 'enter cousrse creater']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },



})

export const Course = mongoose.model("course", schema)