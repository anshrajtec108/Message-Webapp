import React, { useState, useEffect, useRef } from 'react';
import { makePostRequest, socket } from '../../services/api';

const MessagingApp = ({ userId, userInfoObj }) => {
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef(null);
    
    // const roomName = `${localStorage.getItem('Contect')}-${userInfoObj?.payload?.contactNo}`
    const roomName = parseInt(localStorage.getItem('Contect'))+parseInt(userInfoObj?.payload?.contactNo)

    const getMessage = async () => {
        const sendPayload = {
            'sendToContactNo': userInfoObj?.payload?.contactNo,
            'page': page
        };
        try {
            const res = await makePostRequest('/chatmessage/get', {}, sendPayload, {});
            if (page === 1) {
                setMessages([...res.data.reverse()]);
            } else {
                setMessages((prevMessages) => [...res.data.reverse(), ...prevMessages]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleScroll = () => {
        const scrollableElement = messagesEndRef.current;
        if (scrollableElement.scrollTop === 0 && !loading) {
            setLoading(true);
            setPage((prevPage) => prevPage + 1);
        }
    };
//get all the message and Join the room
    useEffect(() => {
        getMessage();
        
        socket.emit('joinRoom', roomName);
    }, [page, userInfoObj, userInfoObj?.payload?.contactNo]);

    //Socket Received message
    useEffect(() => {
        const handleReceiveMessage = (msg) => {
            if (msg.sendBy == localStorage.getItem('Contect')){  
                return 
        }else{
                // console.log('Received message:', msg);
                setMessages((prevMessages) => [...prevMessages, { ...msg, sendBYthem: true }]);
        }
        };

        socket.on('Receivemessage', handleReceiveMessage);

        return () => {
            // Clean up the event listener when the component unmounts
            socket.off('Receivemessage', handleReceiveMessage);
        };
    }, [userInfoObj, userInfoObj?.payload?.contactNo]);

    useEffect(() => {
        const scrollableElement = messagesEndRef.current;
        scrollableElement.addEventListener('scroll', handleScroll);
        return () => {
            scrollableElement.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMessageSend = async () => {
        try {
            if (messageInput.trim() !== '' && userInfoObj?.payload?.contactNo) {
                socket.emit('sendMegSingle', { sendToContactNo: userInfoObj.payload.contactNo, content: messageInput });

                let sendMessageToSave = {
                    "content": messageInput,
                    "sendToContactNo": userInfoObj.payload.contactNo
                };

                const save = await makePostRequest('/chatmessage/save', {}, sendMessageToSave, {});
                let sendMessageObj 
                if (save.statusCode<=200){
                    sendMessageObj = {
                    _id: save.data?._id || "Default value refresh the page",
                    sendBYthem: save.data?.sendBYthem,
                    message: {
                        _id: save.data?.messageId ,
                        content: messageInput,
                        createdAt: save.data?.createdAt || "Default value refresh the page",
                        updatedAt: save.data?.updatedAt || "Default value refresh the page",
                        __v: 0
                    }
                };}
                setMessages((prevMessages) => [...prevMessages, { ...sendMessageObj, sendBYthem: false }]);
                socket.emit('sendMessage', roomName, { ...sendMessageObj, 'sendToContactNo': userInfoObj?.payload?.contactNo, 'sendBy': localStorage.getItem('Contect') });
                setMessageInput('');
            } else {
                console.error('Invalid message input or missing user information');
            }
        } catch (error) {
            console.error('Error occurred while sending or saving message:', error);
            // Handle the error (e.g., display an error message to the user)
        }
    };

    return (
        <div className="bg-gray-100 h-screen flex flex-col">
            {/* Top Header */}
            <div className="bg-blue-500 text-white py-2 px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src={userInfoObj.payload?.avatar}
                        alt="User Avatar"
                        className="h-8 w-8 rounded-full mr-2"
                        style={{ objectFit: 'cover' }}
                    />
                    <span className="font-semibold ml-4  mr-5 text-lg">{userInfoObj.payload?.name}</span>
                    <span className="font-semibold text-lg"> {userInfoObj.payload?.contactNo} </span>
                </div>
                <span className="text-sm ml-9">{"online"}</span>
            </div>

            {/* Sidebar */}
            <div className="bg-gray-200 flex-shrink-0 w-1/5 overflow-y-auto">
                {/* Sidebar content with contact information */}
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4" style={{ overflowY: 'auto' }} ref={(node) => {
                messagesEndRef.current = node;
            }}>
                {/* Messages */}
                {loading && <div>Loading...</div>}
                <div className="flex flex-col space-y-2">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sendBYthem === false ? 'self-end' : ''}>
                            {/* Month header logic */}
                            {index === 0 || new Date(messages[index - 1].message.createdAt).getMonth() !== new Date(msg.message.createdAt).getMonth() ? (
                                <div className="text-center text-gray-500">
                                    {new Date(msg.message.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </div>
                            ) : null}
                            {/* Message content */}
                            <div className={msg.sendBYthem === false ? 'bg-blue-500 text-white p-2 rounded-lg shadow-md self-end' : 'bg-white p-2 rounded-lg shadow-md self-end'}>
                                {msg.message?.content}✔✔
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Text Input Bar */}
            <div className="bg-gray-300 py-2 px-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full mr-2 py-1 px-2 rounded-lg border border-gray-400 focus:outline-none"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button
                    onClick={handleMessageSend}
                    className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default MessagingApp;
