import React from 'react'
import Dashboard from '../pages/Dashboard';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';


const PublicRoutes = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();


    if (user) return navigate("/dashboard");

    return (
        <div>{children}</div>
    )
}

export default PublicRoutes