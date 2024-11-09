import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
    const role = localStorage.getItem('role');

    if (allowedRoles.includes(role)) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
};

// Sử dụng PrivateRoute
<Route
    path="/dashboard"
    element={
        <PrivateRoute allowedRoles={['admin', 'employee']}>
            <DashboardPage />
        </PrivateRoute>
    }
/>
