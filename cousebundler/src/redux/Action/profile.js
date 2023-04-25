import { server } from "../store";
import axios from 'axios'

export const updateProfile = (name, email) => async dispatch => {

    try {
        dispatch({ type: "updatProfileRequest" });
        const { data } = await axios.put(`${server}/updateprfile`, { name, email }, {
            headers: {
                "Content-Type": 'application/json'
            },
            withCredentials: true,

        });

        dispatch({ type: "updatProfileSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "updatProfileFail", payload: error.response.data.message })

    }


};


export const changePassword = (oldPassword, newPassword) => async (dispatch) => {

    try {
        dispatch({ type: "changePasswordRequest" });
        const { data } = await axios.put(`${server}/changepassword`, { oldPassword, newPassword }, {
            headers: {
                "Content-Type": 'application/json'
            },
            withCredentials: true,

        });

        dispatch({ type: "changePasswordSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "changePasswordFail", payload: error.response.data.message })

    }


};

export const updateProfilePicture = formdata => async (dispatch) => {

    try {
        dispatch({ type: "updatProfilePictureRequest" });
        const { data } = await axios.put(`${server}/updateprfilepicture`, formdata, {
            headers: {
                "Content-Type": 'multipart/form-data'
            },
            withCredentials: true,

        });

        dispatch({ type: "updatProfilePictureSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "updatProfilePictureFail", payload: error.response.data.message })

    }


};

export const forgotPassword = (email) => async (dispatch) => {

    try {
        dispatch({ type: "forgotPasswordRequest" });

        const config = {
            headers: {
                "Content-Type": 'application/json'
            },
            withCredentials: true,
        }
        const { data } = await axios.post(`${server}/forgotpassword`, {
            email
        }, { config }
        );

        dispatch({ type: "forgotPasswordSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "forgotPasswordFail", payload: error.response.data.message })

    }


};

export const resetpassword = (token, password) => async (dispatch) => {

    try {
        dispatch({ type: "resetPasswordRequest" });

        const config = {
            headers: {
                "Content-Type": 'application/json'
            },
            withCredentials: true,
        }

        const { data } = await axios.put(`${server}/resetpassword/${token}`, { password }, {
            config
        }

        );

        dispatch({ type: "resetPasswordSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "resetPasswordFail", payload: error.response.data.message })

    }


};
export const addtoplaylist = (id) => async (dispatch) => {

        try {
            dispatch({ type: "addToPlaylistRequest" });
            const config = {
                headers: {
                  'Content-type': 'application/json',
                },
          
                withCredentials: true,
              };
          
              const { data } = await axios.post(
                `${server}/addtoplaylist`,
                {
                  id,
                },
                config
              );
            dispatch({ type: "addToPlaylistsuccess", payload: data.message });
        } catch (error) {
            dispatch({ type: "addToPlaylistFail", payload: error.response.data.message })
    
        }
    
    
    };
    
    export const removePlaylist = (id) => async (dispatch) => {
    
        try {
            dispatch({ type: "removePlaylistRequest" });
            const { data } = await axios.delete(`${server}/removefromplaylist?id=${id}`,{
                headers: {
                    "Content-Type": 'multipart/form-data'
                },
                withCredentials: true,
            }
              
            );
    
            dispatch({ type: "removePlaylistsuccess", payload: data.message });
        } catch (error) {
            dispatch({ type: "removePlaylistRequest", payload: error.response.data.message })
    
        }
    
    
    };