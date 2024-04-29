import { configureStore, current } from '@reduxjs/toolkit';
import currentUserinfoReducer from './reducers/ContactmessageDisplay.js'
import currentUserLogininfoReducer from './reducers/currentUser.js'
import notificationReducer from './reducers/notification.js';

const store = configureStore({
    reducer: {
        currentUserinfo: currentUserinfoReducer,
        currentUserLogin: currentUserLogininfoReducer,
        notification: notificationReducer
    }
})

export default store;