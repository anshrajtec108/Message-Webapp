import React from 'react';
import MessageDisplay from '../components/messageDisplay/MessageDisplay';
import MessagingApp from '../components/messageDisplay/MessageDisplay';
import Contact from '../components/contect/Contect';
import ContactHeader from '../components/contect/ContactHeader';

function Main() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div className="contact" style={{ flex: '2', background: 'url("https://i.ibb.co/q9mygMq/background.jpg") ',overflowY: 'auto',}}>
                <ContactHeader/>
                <Contact/>
                <Contact />
                <Contact />
                <Contact/>
                <Contact/>

                <Contact />
                <Contact />
                <Contact />
                
                <Contact />
                <Contact />
                <Contact />
            </div>
            <div className="massageDetails" style={{ flex: '4', height:'100%', width:'100% ', backgroundColor:"green",overflow:'hidden'}}>
                {/* <MessageDisplay /> */}
                <MessagingApp/>
            </div>
        </div>
    );
}

export default Main;
