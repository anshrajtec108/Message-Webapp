import { configureStore, current } from '@reduxjs/toolkit';
import currentUserinfoReducer from './reducers/ContactmessageDisplay.js'


const store = configureStore({
    reducer: {
        currentUserinfo: currentUserinfoReducer
    }
})

export default store;