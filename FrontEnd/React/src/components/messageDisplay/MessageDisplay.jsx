import React, { useState, useEffect, useRef } from 'react';

const MessagingApp = () => {
    const [messages, setMessages] = useState([
        { text: 'Hello!', sender: 'received' },
        { text: 'Hi there!', sender: 'sent' },
        { text: 'How are you?', sender: 'received' },
        { text: 'Hello!', sender: 'received' },
        { text: 'Hi there!', sender: 'sent' },
        { text: 'Hello!', sender: 'received' },
        { text: 'Hi there!', sender: 'sent' },
        { text: 'Hello!', sender: 'received' },
        { text: 'Hi there!', sender: 'sent' },
        { text: 'Hello!', sender: 'received' },
        { text: 'Hi there!', sender: 'sent' },
        { text: 'Hello!', sender: 'received' },
        { text: 'Hi there!', sender: 'sent' },
        { text: 'Hello!', sender: 'received' },
        { text: 'Hi there!', sender: 'sent' },
    ]);
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef(null);

    // Scroll to the bottom of the messages container
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll to the bottom when messages change or component mounts
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const SenderMessage = ({ message }) => (
        <div className="bg-blue-500 text-white p-2 rounded-lg shadow-md self-end">
            {message}
        </div>
    );

    const ReceiverMessage = ({ message }) => (
        <div className="bg-white p-2 rounded-lg shadow-md self-end">
            {message}
        </div>
    );

    const handleMessageSend = () => {
        if (messageInput.trim() !== '') {
            const newMessage = { text: messageInput, sender: 'sent' };
            setMessages([...messages, newMessage]);
            setMessageInput('');
        }
    };

    return (
        <div className="bg-gray-100 h-screen flex flex-col">
            {/* Top Header */}
            <div className="bg-blue-500 text-white py-2 px-4 flex justify-between items-center">
                {/* Header content */}
                <div className="bg-blue-500 text-white py-2 px-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            src="user-avatar.png"
                            alt="User Avatar"
                            className="h-8 w-8 rounded-full mr-2"
                        />
                        <span className="font-semibold text-lg">John Doe</span>
                    </div>
                    <span className="text-sm ml-9">{"Online"}</span>
                </div>
            </div>

            {/* Sidebar */}
            <div className="bg-gray-200 flex-shrink-0 w-1/5 overflow-y-auto">
                {/* Sidebar content with contact information */}
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Messages */}
                <div className="flex flex-col space-y-2">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender === 'sent' ? 'self-end' : ''}>
                            {msg.sender === 'sent' ? (
                                <SenderMessage message={msg.text} />
                            ) : (
                                <ReceiverMessage message={msg.text} />
                            )}
                        </div>
                    ))}
                    {/* Dummy div for scrolling to the bottom */}
                    <div ref={messagesEndRef} />
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
