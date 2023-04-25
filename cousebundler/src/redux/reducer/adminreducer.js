import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer({}, {
    getAdminStatsRequest: (state) => {
        state.loading = true;
    },
    getAdminStatsSuccess: (state, action) => {
        state.loading = false;

        state.stats = action.payload.stats
        state.usersCount = action.payload.usersCount
            state.subscriptionCount = action.payload.subscriptionCount
            state.viewsCount = action.payload.viewsCount
            state.subscriptionPercentage = action.payload.subscriptionPercentage
            state.viewsPercentage = action.payload.viewsPercentage
            state.usersPercentage = action.payload.usersPercentage
            state.subscriptionProfit = action.payload.subscriptionProfit
            state.viewsProfit = action.payload.viewsProfit
            state.usersProfit = action.payload.usersProfit
    },
    getAdminStatsFail: (state, action) => {

        state.loading = false;

        state.error = action.payload
    },

    getallUserRequest: (state) => {
        state.loading = true;
    },
    getallUserSuccess: (state, action) => {
        state.loading = false;

        state.users = action.payload
    },
    getallUserFail: (state, action) => {

        state.loading = false;

        state.error = action.payload
    },

    deleteUserRequest: (state) => {
        state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
        state.loading = false;

        state.message = action.payload
    },
    deleteUserFail: (state, action) => {

        state.loading = false;

        state.error = action.payload
    },
    updatUserRoleRequest: (state) => {
        state.loading = true;
    },
    updatUserRoleSuccess: (state, action) => {
        state.loading = false;

        state.message = action.payload
    },
    updatUserRoleFail: (state, action) => {

        state.loading = false;

        state.error = action.payload
    },

    createCourseRequest: state => {
        state.loading = true
    },
    createCourseSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload
    },
    createCourseFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    DeleteCourseRequest: state => {
        state.loading = true
    },
    DeleteCourseSuccess: (state, action) => {
        state.message = action.payload
        state.loading = false

    },
    DeleteCourseFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    addLecturesRequest: state => {
        state.loading = true
    },
    addLecturesSuccess: (state, action) => {
        state.message = action.payload
        state.loading = false

    },
    addLecturesFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    deleteLecturesRequest: state => {
        state.loading = true
    },
    deleteLecturesSuccess: (state, action) => {
        state.message = action.payload
        state.loading = false

    },
    deleteLecturesFail: (state, action) => {
        state.loading = false
        state.error = action.payload
    }
    , clearError: state => {
        state.error = null;
    },
    clearmessage: state => {
        state.message = null;
    }
})