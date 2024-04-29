import { createSlice } from '@reduxjs/toolkit'

const initialState={
    newNotification:false,
    notificationObj:[],
    showNotificationDisplay:false
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
                showNotificationDisplay: !state.showNotificationDisplay
            }
        }
    }
})

export const {
    saveNotificationObj,
    saveNewNotification,
    saveShowNotificationDisplay,
} = notificationSlice.actions

export default notificationSlice.reducer