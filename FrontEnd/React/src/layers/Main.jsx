import React, { useEffect, useState } from 'react';
import MessagingApp from '../components/messageDisplay/MessageDisplay';
import Contact from '../components/contect/Contect';
import ContactHeader from '../components/contect/ContactHeader';
import { makeGetRequest } from '../services/api';
import { useDispatch, useSelector } from "react-redux";

function Main() {
    const [contactInfo, setContactInfo] = useState([]);
    //to display and call the user message
    let currentUserInfo = useSelector((store) => store.currentUserinfo)
    // const [isDisplayMeg, setIsDisplayMeg]=useState(false)
    // const [userId,SetUserId]=useState('')
    // const [user]
    console.log(currentUserInfo);

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
    useEffect(() => {
        getUserContact();
    }, []); 
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div className="contactSide" style={{ flex: '2', background: 'url("https://i.ibb.co/q9mygMq/background.jpg") ',overflowY: 'auto',}}>
                <ContactHeader/>
                <div className="contact">
                {contactInfo.map((contact) => (
                    <Contact key={contact._id} userId={contact.userId} userContactInfo={contact.userContactInfo} />
                ))}
                </div>
                {/* <Contact /> */}
              
            </div>
            <div className="massageDetails" style={{ flex: '4', height:'100%', width:'100% ', backgroundColor:"green",overflow:'hidden'}}>
                {/* <MessageDisplay /> */}
                {currentUserInfo.isDisplay ? <MessagingApp userId={currentUserInfo.userId} userInfoObj={currentUserInfo.userObj} /> : <h1>Loading</h1>}
              
            </div>
        </div>
    );
}

export default Main;
