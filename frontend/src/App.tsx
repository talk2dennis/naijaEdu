import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Loading from './components/Loading';
import './index.css';

// Import pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import AboutPage from './pages/About';
import PrivacyPage from './pages/Privacy';
import ContactPage from './pages/Contact';
import EditPage from './pages/EditProfile';
import ChatPage from './pages/ChatPage';
import Layout from './components/Layout';


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
    return (
        <Router>
            <Routes>
                {/* Layout wraps all routes */}
                <Route path="/" element={<Layout />}>
                    {/* Public */}
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="privacy" element={<PrivacyPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />

                    {/* Protected */}
                    <Route path="profile" element={
                        <PrivateRoute>
                            <UserProfilePage />
                        </PrivateRoute>
                    } />
                    <Route path="profile/edit" element={
                        <PrivateRoute>
                            <EditPage />
                        </PrivateRoute>
                    } />
                    <Route path="chat" element={
                        <PrivateRoute>
                            <ChatPage />
                        </PrivateRoute>
                    } />

                    {/* Catch all for 404 */}

                    {/* Catch all */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
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
