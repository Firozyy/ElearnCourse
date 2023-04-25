import { createReducer } from "@reduxjs/toolkit";

export const otherReducer = createReducer({}, {
    ContactRequest: (state) => {
        state.loading = true;
    },
    ContactSuccess: (state, action) => {
        state.loading = false;

        state.message = action.payload
    },
    ContactFail: (state, action) => {

        state.loading = false;

        state.error = action.payload
    },
    courseREQUESTRequest: (state) => {
        state.loading = true;
    },
    courseREQUESTSuccess: (state, action) => {
        state.loading = false;

        state.message = action.payload
    },
    courseREQUESTFail: (state, action) => {

        state.loading = false;

        state.error = action.payload
    }, clearError: state => {
        state.error = null;
    },
    clearmessage: state => {
        state.message = null;
    }
})