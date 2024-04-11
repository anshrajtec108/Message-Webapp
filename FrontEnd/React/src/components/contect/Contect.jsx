import React from 'react';

const Contact = ({ user }) => {
    // const { avatar, name, online } = user;
    let avatar ='https://i.ibb.co/q9mygMq/background.jpg';
    let name="Ansh Raj";
    let online=true

    return (
        <div
            style={{
                width: '100%',
                height: '72px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                margin: '8px 0',
            }}
        >
            {/* User Avatar */}
            <img
                src={avatar}
                alt="User Avatar"
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    marginRight: '16px',
                }}
            />

            {/* User Name */}
            <div
                style={{
                    flex: '1',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                }}
            >
                {name}
            </div>

            {/* Online Status Indicator */}
            {online && (
                <div
                    style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'green',
                        borderRadius: '50%',
                        marginLeft: '16px',
                    }}
                />
            )}
        </div>
    );
};

export default Contact;
