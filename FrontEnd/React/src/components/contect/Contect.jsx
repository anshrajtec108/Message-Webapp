import React, { useState } from 'react';
import MessagingApp from '../messageDisplay/MessageDisplay';
import { useDispatch } from "react-redux";
import { saveIsDisplay, saveIsNewContactDisplay, saveUserId, saveUserObj } from '../../store/reducers/ContactmessageDisplay';

const Contact = ({ userId, userContactInfo }) => {
   
    let dispatch=useDispatch()
    // const UserId=userId
    const name = userContactInfo?.name
    // const email=userContactInfo?.email
    // const about=userContactInfo?.about
    // const contactNo=userContactInfo?.contactNo
    const avatar = userContactInfo?.avatar
    let online = true

    const handelClickOnContact=()=>{
        dispatch(saveIsDisplay(true))
        dispatch(saveUserId(userId))
        dispatch(saveIsNewContactDisplay(true))
        dispatch(saveUserObj(userContactInfo))
    }


    return (
        <div onClick={handelClickOnContact}
            style={{
                width: '100%',
                height: '72px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                margin: '8px 0',
            }}
        >
            {/* User Avatar */}
            <img
                src={avatar}
                alt="User Avatar"
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    marginRight: '16px',
                    objectFit:'cover'
                }}
            />

            {/* User Name */}
            <div
                style={{
                    flex: '1',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                }}
            >
                {name}
            </div>

            {/* Online Status Indicator */}
            {online && (
                <div
                    style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'green',
                        borderRadius: '50%',
                        marginLeft: '16px',
                    }}
                />
            )}
        </div>
    );
};

export default Contact;
