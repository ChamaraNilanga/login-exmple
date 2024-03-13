import React from 'react';
import { useState , useEffect } from 'react';
import { Navigate , useNavigate } from 'react-router-dom';

const PublicRoute =({children}) => {
    const navigate = useNavigate();
    const [valid, setValid] = useState(true);
    console.log(children);
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            navigate('/dashboard');
        } else {
            setValid(false);
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

export default PublicRoute;