import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import notification, { saveShowNotificationDisplay } from '../../store/reducers/notification';
import HorizontalLine from '../helper/HorizontalLine';


function MessageSection({ text}) {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  // Check if text exists before splitting and rendering
  if (!text) {
    // console.log('text', text);
    return <div>No text provided</div>;
  }

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
  // console.log("UserOrGrouoDetails", props?.userDetailObj);
  return(
    //TODO :- if the message from group the userName while be group or we can display user who send the message
    <div style={{display:'flex',alignItems:'center',height:'46px',width:'100%' , maxWidth:''}}>
      <div className="avator" style={{height:'100%',width:'100%',flex:'1',}}>
        <img src={props?.userDetailObj?.avatar ||'https://avatars.githubusercontent.com/u/144613810?s=400&u=7052dbfad869f04fdd337041d71938e75b052d1a&v=4'} 
          height={'34px'} width={'34px'} style={{ height: '34px', width: '34px' , objectFit: 'cover',border:'1px solid white', borderRadius:'50%'}}/>
      </div>
      <div className="userName" style={{height:'100%',width:'100%',flex:'5',}}>
        <h2>{props?.userDetailObj?.name ||'Default name ERROR'}</h2>
      </div>
      <div className="contact" style={{height:'100%',width:'100%',flex:'4',overflow:'hidden'}}>
        <h2> {props?.userDetailObj?.contactNo || 'ContactNO ERROR'}</h2>
      </div>
    </div>
  )
}

function Notification() {
  const dispatch = useDispatch()
  const Notification = useSelector((store) => store.notification)
  let singleMessagedata = Notification?.notificationObj?.payload?.SingleMessageNotification
  // console.log("Notification.notificationObj from notifaction", singleMessagedata)
  
  const handelShowNotitfication=()=>{
    dispatch(saveShowNotificationDisplay(true))
    // console.log('from handelShowNotitfication');
  }
  const handelDefaultClick=(e)=>{
    e.stopPropagation();
    // console.log('from handelDefaultClick');
  }
  return (
    <div style={{height:'100vh',width:'100vh'}} onClick={handelShowNotitfication}>
    <div style={{

      width: '500px',
      height:'500px',
      margin:'auto',
      marginTop:'5%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'white',
      overflowY: 'scroll',
    }}
    onClick={(e)=>handelDefaultClick(e)}>
      <div style={{
        width: '500px',
        maxWidth: '90%', // Limiting the width to 90% of the viewport width
        padding: '20px',
      }}>
        <div className='bg-blue-100 text-black ' style={{
    padding:'8px' ,border:'1px solid gray' , borderRadius:'24px'}}>
            {
              singleMessagedata ? (
                singleMessagedata.map((messageData, index) => (
                  <div key={index} style={{margin:'12px',marginBottom:'20px'}}>
                    <HorizontalLine/>
                    <UserOrGrouoDetails userDetailObj={messageData.sendByUserDetail[0][0]} />
                    {messageData.chats.map((chatData, chatIndex) => {
                      // console.log('chatData.messagesdetail.content', chatData.messagesdetail[0].content)
                      return (
                        <MessageSection
                          key={`${chatData?._id}+${chatIndex}` || chatIndex}
                          text={chatData.messagesdetail[0].content}
                        />
                      );
                    })}
                  </div>
                ))
              ) : (
                <h1>NO Notification</h1>
              )
            }



          {/* <UserOrGrouoDetails userDetailObj={null} /> */}
        {/* <MessageSection text={`Select the JPGs you want to change to PDF, then add the images to our JPG to PDF converter for files is a breeze.`} /> */}
          

        </div>
      </div>
    </div>
    </div>
  )
}

export default Notification
