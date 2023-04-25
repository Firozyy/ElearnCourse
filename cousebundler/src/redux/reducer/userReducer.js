import { createReducer } from "@reduxjs/toolkit";



export const userReducer = createReducer({}, {


    loginRequest: (state) => {
        state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message
    },
    loginFail: (state, action) => {

        state.loading = false;
        state.isAuthenticated = false;
        state.user = action.payload.user;
        state.error = action.payload
    },

    registerRequest: (state) => {
        state.loading = true;
    },
    registerSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message
    },
    registerFail: (state, action) => {

        state.loading = false;
        state.isAuthenticated = false;
        state.user = action.payload.user;
        state.error = action.payload
    },



    loaduserRequest: (state) => {
        state.loading = true;
    },
    loaduserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;

    },
    loaduserFail: (state, action) => {

        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload.user
    },
    //logout
    logoutRequest: (state) => {
        state.loading = true;
    },
    logoutSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload
    },
    logoutFail: (state, action) => {

        state.loading = false;
        state.isAuthenticated = true;

        state.error = action.payload
    },

    clearError: state => {
        state.error = null;
    },
    clearmessage: state => {
        state.message = null;
    }
})

export const profilereducer = createReducer({}, {
    updatProfileRequest: (state) => {
        state.loading = true;
    },
    updatProfileSuccess: (state, action) => {
        state.loading = false;

        state.message = action.payload
    },
    updatProfileFail: (state, action) => {

        state.loading = false;

        state.error = action.payload
    },

    changePasswordRequest: (state) => {
        state.loading = true;
    },
    changePasswordSuccess: (state, action) => {
        state.loading = false;

        state.message = action.payload
    },
    changePasswordFail: (state, action) => {

        state.loading = false;

        state.error = action.payload
    },

    updatProfilePictureRequest: (state) => {
        state.loading = true;
    },
    updatProfilePictureSuccess: (state, action) => {
        state.loading = false;

        state.message = action.payload
    },
    updatProfilePictureFail: (state, action) => {

        state.loading = false;

        state.error = action.payload
    },

    forgotPasswordRequest: (state) => {
        state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
        state.loading = false;

        state.message = action.payload
    },
    forgotPasswordFail: (state, action) => {

        state.loading = false;

        state.error = action.payload
    },
    resetPasswordRequest: (state) => {
        state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false;

        state.message = action.payload
    },
    resetPasswordFail: (state, action) => {

        state.loading = false;

        state.error = action.payload
    },
    removePlaylistRequest: (state) => {
        state.loading = true
    },
    removePlaylistsuccess: (state, action) => {
        state.loading = false
        state.message = action.payload;
    },
    removePlaylistFail: (state, action) => {
        state.loading = false
        state.errer = action.payload;
    },
    clearError: state => {
        state.error = null;
    },
    clearmessage: state => {
        state.message = null;
    }
});

export const subscriptionReducer = createReducer({}, {
    buySubscriptionRequest: state => {
        state.loading = true;
    },
    buySubscriptionSuccess: (state, action) => {
        state.loading = false;
        state.subscriptionId = action.payload;
    },
    buySubscriptionFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
    ,
    
    cancelSubscriptionRequest: state => {
        state.loading = true;
    },
    cancelSubscriptionSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    cancelSubscriptionFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
    ,
    clearError: state => {
        state.error = null;
    },
    clearmessage: state => {
        state.message = null;
    }
})