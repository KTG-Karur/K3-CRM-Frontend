import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// helpers
import { APICore } from '../helpers/api/apiCore';

// hooks
import { useUser } from '../hooks';

type PrivateRouteProps = {
    component: React.ComponentType;
    roles?: string[];
};

/**
 * PrivateRoute component to guard routes based on authentication and roles
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: RouteComponent, roles = [], ...rest }) => {
    const location = useLocation();

    const loginData = sessionStorage.getItem('loginInfo') || '{}';
    const userData = JSON.parse(loginData);
    const loginStatus = loginData?.length > 0 ? true : false
    const userRights = userData?.userDetails?.userRights || {};
    const userRole = userData?.userDetails?.role_name || '';
    console.log('userData', userData);
    // Redirect to login if not authenticated
    if (!loginStatus) {
        sessionStorage.removeItem("loginInfo");
        sessionStorage.clear();
        return <Navigate to={'/auth/login'} state={{ from: location }} replace />;
    }

    // Redirect to access-denied if the role is not authorized
    if (roles.length && !roles.includes(userRole)) {
        sessionStorage.removeItem("loginInfo");
        sessionStorage.clear();
        return <Navigate to={'/auth/login'} state={{ from: location }} replace />;
    }

    // Render the component if authorized
    return <RouteComponent {...rest} {...userRights} {...userRole} />;
};

export default PrivateRoute;
