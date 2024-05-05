import React, { useEffect, useState } from 'react';
import MessagingApp from '../components/messageDisplay/MessageDisplay';
import Contact from '../components/contect/Contect';
import ContactHeader from '../components/contect/ContactHeader';
import { makeDeleteRequest, makeGetRequest, makePostRequest } from '../services/api';
import { useDispatch, useSelector } from "react-redux";
import { redirect } from 'react-router-dom';
import { saveNotificationObj, saverelayIdArr } from '../store/reducers/notification';
import NotificationCom from '../components/notification/Notification';
function Main() {
    let relayIdArr = []
   
    const currentUserLogin = useSelector((store) => store.currentUserLogin);

    const Notification = useSelector((store) => store.notification)
    // console.log("Notification.notificationObj", Notification?.notificationObj?.payload?.SingleMessageNotification[0])
    const dispatch=useDispatch()
    const [contactInfo, setContactInfo] = useState([]);

    //to display and call the user message
    let currentUserInfo = useSelector((store) => store.currentUserinfo)
    // console.log('currentUserInfo', currentUserInfo);
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
        console.log("res of create session", res);
        dispatch(saveNotificationObj(res.data))
        console.log("Relay ID arr ", res?.data?.SingleMessageNotification[0]?.relayId);
        relayIdArr = res?.data?.SingleMessageNotification[0]?.relayId
        // dispatch(saverelayIdArr(res.data.SingleMessageNotification[0].relayId))
        // console.log("r  sendthedataForEndSession", sendthedataForEndSession);

     
        return
    }
    const endSession = async () => {
        let sendthedataForEndSession = {
            relayArr: relayIdArr
        }
        await makeDeleteRequest('/session/endsession', {},sendthedataForEndSession ,{})

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
    // const [showNtotification, setShowNotification] = useState(false)
    let showNotification = Notification.showNotificationDisplay
    // console.log("showNotification",showNotification);
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
            background:'black'
         }}>
                {/* <MessageDisplay /> */}
                {currentUserInfo.isDisplay ? <MessagingApp key={currentUserInfo.userId + "keykry"} /> : <h1 style={{ display: 'flex', alignItems: 'center', color: 'white', margin: '200px', padding: '10px', border: 'solid white 1px', backgroundColor: 'green' }}>Click on Contact</h1>}

            </div>
        </div>
            <div style={{ display: showNotification ? 'block' : 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>< NotificationCom /></div>
        </>
    );
}

export default Main;
