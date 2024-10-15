import { Suspense, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// hooks
import { useRedux } from '../hooks/';

// utils
import { changeBodyAttribute } from '../utils';

const loading = () => <div>Loading...</div>;

const DefaultLayout = () => {
    const { appSelector } = useRedux();

    const { layoutColor } = appSelector((state) => ({
        layoutColor: state.Layout.layoutColor,
    }));

    useEffect(() => {
        changeBodyAttribute('data-layout-color', layoutColor);
    }, [layoutColor]);

    const userDetail = sessionStorage.getItem('adminto_user');

    if (userDetail) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Suspense fallback={loading()}><Outlet /></Suspense>;
};

export default DefaultLayout;
