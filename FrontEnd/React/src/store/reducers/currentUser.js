import { createSlice } from '@reduxjs/toolkit'

const initialState={
    login:false,
    userDetails:{}
}

const currentUserLogin=createSlice({
    name:'currentuserLogin',
    initialState,
    reducers:{

        saveUserDetails(state, payLoad) {
            if (payLoad) {
                return {
                    ...state,
                    userDetails: {
                        ...payLoad
                    }
                }
            }
        },

        saveLogin(state, payLoad) {
            return {
                ...state,
                login: payLoad
            }
        },
    }
})

export const {
    saveUserDetails,
    saveLogin
} = currentUserLogin.actions

export default currentUserLogin.reducer