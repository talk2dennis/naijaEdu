import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Loading from './components/Loading';
import './index.css';

// Import pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutPage from './pages/About';
import PrivacyPage from './pages/Privacy';
import ContactPage from './pages/Contact';
import EditPage from './pages/EditProfile';
import Message from './components/Message';

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loading title="Loading user data..." />;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
    const {toastMsg } = useAuth();
    if (toastMsg) console.log("Toast message:", toastMsg);
    return (
        <Router>
            {/* Show message if exists */}
            {toastMsg?.message && (
                <Message
                    message={toastMsg.message}
                    type={toastMsg.type} />
            )}
            {/* Show loading state if auth is loading */}
            <Header />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/About" element={<AboutPage />}/>
                <Route path="/contact" element={<ContactPage />} />

                {/* Protected Routes */}
                <Route path="/profile" element={
                    <PrivateRoute>
                        <UserProfilePage />
                    </PrivateRoute>
                } />
                <Route path="/profile/edit" element={
                    <PrivateRoute>
                        <EditPage />
                    </PrivateRoute>
                } />
            

                {/* Redirect unknown paths */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
        </Router>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
};

export default App;
