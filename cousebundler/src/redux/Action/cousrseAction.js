
import { server } from "../store";
import axios from 'axios'

export const getallcousrses = (catagory = "", keyword = '') => async (dispatch) => {

    try {
        dispatch({ type: "allCourseRequest" });
        const { data } = await axios.get(`${server}/courses?keyword=${keyword}&catagory=${catagory}`
          
        );

        dispatch({ type: "allCoursesuccess", payload: data.courses });
    } catch (error) {
        dispatch({ type: "allCourseFail", payload: error.response.data.message })

    }


};

export const getCourseLecture = (id) => async (dispatch) => {
    
    try {
        dispatch({ type: "getCourseRequest" });
        const { data } = await axios.get(`${server}/course/${id}`,{
            withCredentials:true
        }
          
        );

        dispatch({ type: "getCoursesuccess", payload: data.lectures });
    } catch (error) {
        dispatch({ type: "getCourseFail", payload: error.response.data.message, })

    }


};


