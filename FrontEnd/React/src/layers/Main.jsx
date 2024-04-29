import React, { useEffect, useState } from 'react';
import MessagingApp from '../components/messageDisplay/MessageDisplay';
import Contact from '../components/contect/Contect';
import ContactHeader from '../components/contect/ContactHeader';
import { makeDeleteRequest, makeGetRequest, makePostRequest } from '../services/api';
import { useDispatch, useSelector } from "react-redux";
import { redirect } from 'react-router-dom';
import { saveNotificationObj } from '../store/reducers/notification';
import NotificationCom from '../components/notification/Notification';
function Main() {
    const currentUserLogin = useSelector((store) => store.currentUserLogin);

    const Notification = useSelector((store) => store.notification)
    console.log("Notification.notificationObj", Notification?.notificationObj?.payload?.SingleMessageNotification[0])
    const dispatch=useDispatch()
    const [contactInfo, setContactInfo] = useState([]);

    //to display and call the user message
    let currentUserInfo = useSelector((store) => store.currentUserinfo)
    console.log('currentUserInfo', currentUserInfo);
    const getUserContact = () => {

        makeGetRequest('/contact/getcontact', {}, {})
            .then((res) => {
                if (res.statusCode <= 200) {
                    setContactInfo(res.data);
                    // console.log("contact", res.data)
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    const createSession = async () => {
        const res = await makePostRequest('/session/entrysession', {}, { "status": true }, {})
        dispatch(saveNotificationObj(res.data))
        console.log("res of create session", res);
     
        return
    }
    const endSession = async () => {
        await makeDeleteRequest('/session/endsession', {}, {})

    }

    useEffect(() => {
        getUserContact();
        createSession();
        const handleUnload = () => {
            endSession();
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            endSession(); // Call endSession explicitly on component unmount as well
        };
    }, [])
    const [showNtification, setShowNotification] = useState(false)
    return (
        <>
            <div style={{ display: 'flex', height: '100vh',  position: 'relative' }}>
            <div className="contactSide" style={{ flex: '2', background: 'url("https://i.ibb.co/q9mygMq/background.jpg") ', overflowY: 'auto', }}>
                <ContactHeader />
                <div className="contact">
                    {contactInfo.map((contact, index) => (
                        <Contact key={contact.userId + index} userId={contact.userId} userContactInfo={contact.userContactInfo} />
                    ))}
                </div>
                {/* <Contact /> */}

            </div>
            <div className="massageDetails" style={{ flex: '4', height: '100%', width: '100% ', overflow: 'hidden', 
            background: "url('data:image/jpeg;base64,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')"
         }}>
                {/* <MessageDisplay /> */}
                {currentUserInfo.isDisplay ? <MessagingApp key={currentUserInfo.userId + "keykry"} userId={currentUserInfo.userId} userInfoObj={currentUserInfo.userObj} /> : <h1 style={{ display: 'flex', alignItems: 'center', color: 'white', margin: '200px', padding: '10px', border: 'solid white 1px', backgroundColor: 'green' }}>Click on Contact</h1>}

            </div>
        </div>
            <div style={{ display: showNtification ? 'block' : 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>< NotificationCom /></div>
        </>
    );
}

export default Main;
