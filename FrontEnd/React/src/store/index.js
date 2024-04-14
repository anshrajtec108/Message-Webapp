import { configureStore, current } from '@reduxjs/toolkit';
import currentUserinfoReducer from './reducers/ContactmessageDisplay.js'
import currentUserLogininfoReducer from './reducers/currentUser.js'

const store = configureStore({
    reducer: {
        currentUserinfo: currentUserinfoReducer,
        currentUserLogin: currentUserLogininfoReducer
    }
})

export default store;