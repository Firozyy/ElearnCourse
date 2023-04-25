import { configureStore } from '@reduxjs/toolkit'
import { profilereducer, subscriptionReducer, userReducer, } from './reducer/userReducer.js'
import { courseReducer } from './reducer/courseReducer.js';
import { adminReducer } from './reducer/adminreducer.js';
import { otherReducer } from './reducer/otherreducer.js';
const store = configureStore({
    reducer: {
        users: userReducer,
        profile:profilereducer,
        cources:courseReducer,
        subscription:subscriptionReducer,
        admin:adminReducer,
        other:otherReducer
    }
});


export default store;


export const server = 'http://localhost:4000/api/v1'
