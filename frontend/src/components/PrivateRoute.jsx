import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ element, ...rest }) => {
    const { token } = useAuth();

    return (
        <Route
            {...rest}
            element={
                token ? element : <Navigate to="/login" />
            }
        />
    );
};

export default PrivateRoute;
