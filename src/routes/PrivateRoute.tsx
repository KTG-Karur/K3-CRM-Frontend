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
    const [loggedInUser] = useUser();
    const api = new APICore();

    // Redirect to login if not authenticated
    if (!api.isUserAuthenticated()) {
        return <Navigate to={'/auth/login'} state={{ from: location }} replace />;
    }

    const userRole = loggedInUser?.userDetails?.role_name;
    const userRights = loggedInUser?.userDetails.userRights || '{}';

    // Redirect to access-denied if the role is not authorized
    if (roles.length && !roles.includes(userRole)) {
        return <Navigate to={'/access-denied'} replace />;
    }

    // Render the component if authorized
    return <RouteComponent {...rest} {...userRights} {...userRole} />;
};

export default PrivateRoute;
