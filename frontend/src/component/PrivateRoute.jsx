import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext'; 

export const PrivateRoute = ({ children }) => {
    const { isAuth } = useContext(AuthContext); 
    const location = useLocation();

    return isAuth ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location.pathname }} replace={true} />
    );
};
