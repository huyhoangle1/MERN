import { createContext, useReducer,useEffect } from "react"
import axios from "axios"
import {authReducer} from "../reducers/AuthReducer"
import {apiUrl,LOCAL_STRONG_TOKEN_NAME} from './constants'
import setAuthToken from "../utils/setAuthToken"

export const Authcontext = createContext();
const AuthcontextProvider =({children})=>{
    const [authState,dispatch] = useReducer(authReducer,{
        authLoading: true,
        isAuthenticated: false,
        user: null,
    })

    useEffect(() =>  loadUser(), [] )

    //authentication user
    const loadUser = async()=>{
        if(LOCAL_STRONG_TOKEN_NAME){
            setAuthToken(localStorage[LOCAL_STRONG_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${apiUrl}/auth`);
            if(response.data.success){
                dispatch({
                    type : 'SET_AUTH',
                    payload: { isAuthenticated:true, user:response.data.user}
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STRONG_TOKEN_NAME);
            setAuthToken(null);
            dispatch({type :'SET_AUTH', payload: { isAuthenticated:false, user:null}})
        }
    }

    //Login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`,userForm);
            if(response.data.success) {
                localStorage.setItem(LOCAL_STRONG_TOKEN_NAME,response.data.accessToken);

                return response.data
            }
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success:false,message:error.message}
            
        }
    } 

    // Context data
    const authContextData ={loginUser, authState}

    //return provider
    return(
        <Authcontext.Provider value={authContextData}>
            {children}
        </Authcontext.Provider>
    )
}

export default AuthcontextProvider;