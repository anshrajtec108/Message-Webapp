import { createSlice } from '@reduxjs/toolkit'

const initialState={
    newNotification:false,
    notificationObj:[]
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
    }
})

export const {
    saveNotificationObj,
    saveNewNotification
} = notificationSlice.actions

export default notificationSlice.reducer