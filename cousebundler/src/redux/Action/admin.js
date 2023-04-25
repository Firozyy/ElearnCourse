import { server } from "../store";
import axios from 'axios'

export const creatCourse = (formdata) => async (dispatch) => {

    try {


        dispatch({ type: "createCourseRequest" });

        const { data } = await axios.post(`${server}/createcourse`, formdata, {
            headers: {
                "Content-Type": 'multipart/form-data'
            },
            withCredentials: true,

        })

        dispatch({ type: "createCourseSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "createCourseFail", payload: error.response.data.message })

    }


};

export const deleteCourse = (id) => async (dispatch) => {

    try {
        const config = {
            withCredentials: true,
        }

        dispatch({ type: "  DeleteCourseRequest" });

        const { data } = await axios.delete(`${server}/course/${id}`, config)

        dispatch({ type: "  DeleteCourseSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "  DeleteCourseFail", payload: error.response.data.message })

    }


};

export const addLectures = (id,formdata) => async (dispatch) => {

    try {
      

        dispatch({ type: "  addLecturesRequest" });

        const { data } = await axios.post(`${server}/course/${id}`,formdata,{
            headers: {
                "Content-Type": 'multipart/form-data'
            },
            withCredentials: true,

        })

        dispatch({ type: "  addLecturesSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "  addLecturesFail", payload: error.response.data.message })

    }


};

export const deletLecture = (courseid,lectureid) => async (dispatch) => {

    try {
      

        dispatch({ type: "  deleteLecturesRequest" });

        const { data } = await axios.delete(`${server}/lecture?courseId=${courseid}&lecturesId=${lectureid}`,{
           
            withCredentials: true,

        })

        dispatch({ type: "  deleteLecturesSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "  deleteLecturesFail", payload: error.response.data.message })

    }


};


export const getAlluser = () => async (dispatch) => {

    try {


        dispatch({ type: "getallUserRequest" });

        const { data } = await axios.get(`${server}/admin/users`, {
            headers: {
                "Content-Type": 'multipart/form-data'
            },
            withCredentials: true,

        })

        dispatch({ type: "getallUserSuccess", payload: data.users });
    } catch (error) {
        dispatch({ type: "getallUserFail", payload: error.response.data.message })

    }


};

export const updateuser = (id) => async (dispatch) => {

    try {


        dispatch({ type: "updatUserRoleRequest" });

        const { data } = await axios.put(`${server}/admin/users/${id}`, {},{
            headers: {
                "Content-Type": 'multipart/form-data'
            },
            withCredentials: true,

        })

        dispatch({ type: "updatUserRoleSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "updatUserRoleFail", payload: error.response.data.message })

    }


};

export const deleteuser = (id) => async (dispatch) => {

    try {


        dispatch({ type: "deleteUserRequest" });

        const { data } = await axios.delete(`${server}/admin/users/${id}`,{

            withCredentials: true,

        })

        dispatch({ type: "deleteUserSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "deleteUserFail", payload: error.response.data.message })

    }


};

export const getdashbordstats = (id) => async (dispatch) => {

    try {


        dispatch({ type: "getAdminStatsRequest" });

        const { data } = await axios.get(`${server}/admin/stats`, {
            headers: {
                "Content-Type": 'multipart/form-data'
            },
            withCredentials: true,

        })

        dispatch({ type: "getAdminStatsSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "getAdminStatsFail", payload: error.response.data.message })

    }


};
