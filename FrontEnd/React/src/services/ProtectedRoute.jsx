import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ Component }) {
    const navigate = useNavigate();

    useEffect(() => {
        const isLogin = localStorage.getItem('isLogin');
        const contectNO = localStorage.getItem('Contect');

        if (!isLogin || !contectNO) {
            console.log('Please login');
            navigate('/login');
        }
    }, []);

    return (
        <div>
            <Component />
        </div>
    );
}

export default ProtectedRoute;
