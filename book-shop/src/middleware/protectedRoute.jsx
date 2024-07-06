import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from '../components/authContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, role } = AuthProvider();
    const location = useLocation();

    if (!isAuthenticated || role === 'admin') {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children || <Outlet />;
};

export default ProtectedRoute;