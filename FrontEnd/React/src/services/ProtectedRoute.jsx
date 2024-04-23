import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoute({ Component }) {
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(!Cookies.get('accessToken'));
      
        if (!Cookies.get('accessToken') ){
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
