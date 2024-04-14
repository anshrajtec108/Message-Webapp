import React, { useState, useEffect, useRef } from 'react';
import { makePostRequest, socket } from '../../services/api';


const MessagingApp = ({ userId, userInfoObj }) => {
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef(null);
        // console.log(userInfoObj);


    
    const getMessage = async () => {
        const sendPayload = {
            'sendToContactNo': userInfoObj?.payload?.contactNo,
            'page': page
        };
        try {
            const res = await makePostRequest('/chatmessage/get', {}, sendPayload, {});
            if(page===1){
                setMessages([...res.data])
            }else{
                console.log("else ...res.data",...res.data);
            setMessages((prevMessages) => [...res.data, ...prevMessages]);
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

    useEffect(() => {
        getMessage();
    }, [page]);

    useEffect(() => {
        const scrollableElement = messagesEndRef.current;
        scrollableElement.addEventListener('scroll', handleScroll);
        return () => {
            scrollableElement.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        socket.on('getMsgSingle', (msg) => {
            console.log(msg);
        });
        return () => {
            socket.off('getMsgSingle')
        }
    }, []);
    const handleMessageSend = () => {
        if (messageInput.trim() !== '') {
            socket.emit('sendMegSingle', { sendToContactNo: userInfoObj?.payload?.contactNo, content :messageInput})
            setMessageInput('')
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
                    <span className="font-semibold ml-3 text-lg">{userInfoObj.payload?.userName}</span>
                    <span className="font-semibold text-lg"> {userInfoObj.payload?.contactNo} </span>
                </div>
                <span className="text-sm ml-9">{"online"}</span>
            </div>

            {/* Sidebar */}
            <div className="bg-gray-200 flex-shrink-0 w-1/5 overflow-y-auto">
                {/* Sidebar content with contact information */}
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4" style={{ overflowY: 'auto' }} ref={(node)=>{
                messagesEndRef.current = node;
            }} >
                {/* Messages */}
                {loading && <div>Loading...</div>}
                <div className="flex flex-col space-y-2">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sendBYthem === false ? 'self-end' : ''}>
                            {msg.sendBYthem === false ? (
                                <div className="bg-blue-500 text-white p-2 rounded-lg shadow-md self-end">
                                    {msg.message?.content}✔✔
                                </div>
                            ) : (
                                <div className="bg-white p-2 rounded-lg shadow-md self-end">
                                        {msg.message?.content}✔✔ 
                                </div>
                            )}
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
