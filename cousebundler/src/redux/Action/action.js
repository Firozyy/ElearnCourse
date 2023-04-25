import { server } from "../store";
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {


    try {
        dispatch({ type: "loginRequest" });
        const { data } = await axios.post(`${server}/login`, { email, password }, {
            headers: {
                "Content-Type": 'application/json'
            },
            withCredentials: true,

        });
        dispatch({ type: "loginSuccess", payload: data })

    } catch (error) {
        dispatch({ type: "loginFail", payload: error.response.data.message })
    }
};

export const getmyprofile = () => async (dispatch) => {


    try {
        dispatch({ type: "loaduserRequest" });
        const { data } = await axios.get(`${server}/me`,
            {

                withCredentials: true,

            });

        dispatch({ type: "loaduserSuccess", payload: data.user })

    } catch (error) {
        dispatch({ type: "loaduserFail", payload: error.response.data.message })
    }
};

export const register = (formdata) => async (dispatch) => {


    try {
        dispatch({ type: "registerRequest" });
        const { data } = await axios.post(`${server}/register`, formdata, {
            headers: {
                "Content-Type": 'multipart/form-data'
            },
            withCredentials: true,

        });
        dispatch({ type: "registerSuccess", payload: data })

    } catch (error) {
        dispatch({ type: "registerFail", payload: error.response.data.message })
    }
};


export const logout = () => async (dispatch) => {


    try {
        dispatch({ type: "logoutRequest" });
        const { data } = await axios.get(`${server}/logout`,
            {

                withCredentials: true,

            });

        dispatch({ type: "logoutSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "logoutFail", payload: error.response.data.message });
    }
};

export const buySubscrioption = () => async (dispatch) => {


    try {
        dispatch({ type: "buySubscriptionRequest" });
        const { data } = await axios.get(`${server}/subscribe`, {

            withCredentials: true,

        });

        dispatch({ type: "buySubscriptionSuccess", payload: data.subscriptionID })

    } catch (error) {
        dispatch({ type: "buySubscriptionFail", payload: error.response.data.message })
    }
};


export const cancelSubscrioption = () => async (dispatch) => {


    try {
        dispatch({ type: "cancelSubscriptionRequest" });
        const { data } = await axios.delete(`${server}/subscribe/cancel`, {

            withCredentials: true,

        });

        dispatch({ type: "cancelSubscriptionSuccess", payload: data.message })

    } catch (error) {
        dispatch({ type: "cancelSubscriptionFailriptionFail", payload: error.response.data.message })
    }
};