import { createSlice } from '@reduxjs/toolkit'


const initialState={
    isDisplay:false,
    userObj:{},
    userId:''
}

const currentUserMessageSlice =createSlice({
    name:'currentUser',
    initialState,
    reducers:{

        saveUserObj(state, payLoad){
            if(payLoad){
                return{
                    ...state,
                    userObj:{
                        ...payLoad
                    }
                }
            }
        },

        saveUserId(state,payLoad){
            if(payLoad){
                return{
                    ...state,
                    userId:payLoad
                }
            }
        },

        saveIsDisplay(state,payLoad){
            return{
                ...state,
                isDisplay:payLoad
            }
        },


    }
})

export const{
    saveIsDisplay,
    saveUserId,
    saveUserObj
} = currentUserMessageSlice.actions;

export default currentUserMessageSlice.reducer;