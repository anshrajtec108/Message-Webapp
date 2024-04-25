import React from 'react';

const ContactHeader = () => {
    return (
        <div className="bg-blue-500 text-white py-4 px-6 ">
            <div className="flex items-center justify-between">
                {/* Logo or big text */}
                <h1 className="text-2xl font-bold">Messaging...</h1>
                <h1 style={{cursor:'pointer'}}>🔔</h1>
            </div>
            <div className="mt-4">
                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search contacts..."
                    className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400"
                />
            </div>
        </div>
    );
};

export default ContactHeader;
