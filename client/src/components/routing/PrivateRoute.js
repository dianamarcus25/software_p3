import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {

    // If authorised, return an outlet that will render child elements
    // If not, return navigate to login page since user is not authorised unless loggedin
    return localStorage.getItem("authToken") ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute