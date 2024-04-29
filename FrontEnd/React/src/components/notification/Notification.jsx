import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import notification from '../../store/reducers/notification';

function MessageSection({text}){

  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div>
      {showFullText ? (
        <p>🔴 {text}</p>
      ) : (
        <p>
            🔴
          {text.split(' ').slice(0, 10).join(' ')}{' '}
          {text.split(' ').length > 10 && (
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={toggleText}>
              Read More
            </span>
          )}
        </p>
      )}
    </div>
  );
}

function UserOrGrouoDetails(props) {

  return(
    //TODO :- if the message from group the userName while be group or we can display user who send the message
    <div style={{display:'flex',alignItems:'center',height:'46px',width:'100%' , maxWidth:''}}>
      <div className="avator" style={{height:'100%',width:'100%',flex:'1',}}>
        <img src={props?.userDetailObj?.avatar ||'https://avatars.githubusercontent.com/u/144613810?s=400&u=7052dbfad869f04fdd337041d71938e75b052d1a&v=4'} 
        height={'34px'} width={'34px'} style={{border:'1px solid white', borderRadius:'50%'}}/>
      </div>
      <div className="userName" style={{height:'100%',width:'100%',flex:'5',}}>
        <h2>{props?.userDetailObj?.name ||'Default name ERROR'}</h2>
      </div>
      <div className="contact" style={{height:'100%',width:'100%',flex:'3',}}>
        <h2> {props?.userDetailObj?.contactNo || 'Default ContactNO ERROR'}</h2>
      </div>
    </div>
  )
}

function Notification() {

  // const Notification = useSelector((store) => store.notification)
  // console.log("Notification.notificationObj", Notification?.notificationObj?.payload?.SingleMessageNotification[0])
  return (
    <div style={{

      width: '500px',
      height:'500px',
      margin:'auto',
      marginTop:'5%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
       // Using viewport height to center vertically
      backgroundColor: 'white',
      overflowY: 'scroll',
    }}>
      <div style={{
        width: '500px',
        maxWidth: '90%', // Limiting the width to 90% of the viewport width
        padding: '20px',
      }}>
        <div style={{ backgroundColor: 'white', }}>
      
          <UserOrGrouoDetails userDetailObj={null} />
        <MessageSection text={`Select the JPGs you want to change to PDF, then add the images to our JPG to PDF converter for files is a breeze.`} />


        </div>
      </div>
    </div>
  )
}

export default Notification
