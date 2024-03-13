import React, { useEffect, useState } from 'react';
import { Navigate , useNavigate } from 'react-router-dom';

const PrivateRoute =({children}) => {
    const navigate = useNavigate();
    const [valid, setValid] = useState(true);
    console.log(children);
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            console.log('Token is present');
            setValid(false);
        } else {
            navigate('/login');
        }
    }, [token]);

    return (
        <div>
                    {valid ? (
        <div>Loading..</div>
                    ) : (
        <React.Fragment>{children}</React.Fragment>
                    )}
        </div>
            );
}

export default PrivateRoute;