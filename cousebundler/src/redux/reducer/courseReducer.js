import { createReducer } from '@reduxjs/toolkit'


export const courseReducer = createReducer({ courses: [], lectures: [] }, {
    allCourseRequest: (state) => {
        state.loading = true
    },
    allCoursesuccess: (state, action) => {
        state.loading = false
        state.courses = action.payload;
    },
    allCourseFail: (state, action) => {
        state.loading = false
        state.errer = action.payload;
    },
    addToPlaylistRequest: (state) => {
        state.loading = true
    },
    addToPlaylistsuccess: (state, action) => {
        state.loading = false
        state.message = action.payload;
    },
    addToPlaylistFail: (state, action) => {
        state.loading = false
        state.errer = action.payload;
    },
    getCourseRequest: (state) => {
        state.loading = true
    },
    getCoursesuccess: (state, action) => {
        state.loading = false
        state.lectures = action.payload;
    },
    getCourseFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearError: state => {
        state.error = null;
    },
    clearmessage: state => {
        state.message = null;
    }
});