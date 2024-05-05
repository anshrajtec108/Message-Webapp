import { createSlice } from '@reduxjs/toolkit'

const initialState={
    newNotification:false,
    notificationObj:[],
    showNotificationDisplay:false,
    relayIdArr:[]
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        saveNotificationObj(state, payLoad) {
            if (payLoad) {
                return {
                    ...state,
                    notificationObj: {
                        ...payLoad
                    }
                }
            }
        },

        saveNewNotification(state, payLoad) {
            return {
                ...state,
                login: payLoad
            }
        },

        saveShowNotificationDisplay(state,payLoad){
            return{
                ...state,
                showNotificationDisplay: !(state.showNotificationDisplay)
            }
        },

        saverelayIdArr(state, payLoad) {
            if (payLoad) {
                console.log("  ...payLoad in saverelayIdArr",payLoad);
                return {
                    ...state,
                    relayIdArr: {
                        ...payLoad.payload
                    }
                }
            }
        },
    }
})

export const {
    saveNotificationObj,
    saveNewNotification,
    saveShowNotificationDisplay,
    saverelayIdArr,
} = notificationSlice.actions

export default notificationSlice.reducer