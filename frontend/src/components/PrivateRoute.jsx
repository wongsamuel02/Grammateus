import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import PropTypes from 'prop-types';

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

PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default PrivateRoute;
