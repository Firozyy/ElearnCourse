import { server } from "../store";
import axios from 'axios'

export const contactUs = (name,email,message) => async (dispatch) => {
    
    try {
        dispatch({ type: "ContactRequest" });
        const { data } = await axios.post(`${server}/contact`,{name,email,message},{
            headers: {
                "Content-Type": 'application/json'
            },
            withCredentials: true,

        
        }
        );

        dispatch({ type: "ContactSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "ContactFail", payload: error.response.data.message })

    }


};
export const couurserequest = (name,email,course) => async (dispatch) => {

    try {
        dispatch({ type: "courseREQUESTRequest" });
        const { data } = await axios.post(`${server}/courserequest`,{name,email,course},{
            headers: {
                "Content-Type": 'application/json'
            },
            withCredentials: true,

        
        }
        );

        dispatch({ type: "courseREQUESTSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "courseREQUESTFail", payload: error.response.data.message })

    }


};