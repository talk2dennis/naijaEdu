import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './css/UserProfilePage.css';
import axiosClient from '../api/axiosClient';
import ProfilePicture from '../components/ProfilePicture';


export default function UserProfilePage() {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated, token } = useAuth();


    const handleDeleteAccount = async () => {
        // if user confirms, send delete request
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            // Call API to delete account
            try {
                const res = await axiosClient.delete('/users/delete');
                if (res.status === 200) {
                    alert("Account deleted successfully.");
                    navigate('/login');
                }
            } catch (error) {
                console.error("Failed to delete account:", error);
                alert("Failed to delete account. Please try again later.");
            }
        }

    };

    const handleEditProfile = () => {
        // Redirect to edit profile page
        navigate('/profile/edit');
    };

    if (!user || !isAuthenticated) {
        logout(); // Clear token and user data
        localStorage.removeItem("token");
        alert("You need to be logged in to view your profile.");
        navigate('/login');
        return;
    } else localStorage.setItem("token", token || "");

    
    return (
        <div className="profile-container">
            {/* Profile Info Section */}
            <section className="section profile-info" id="profile-info">
                <div className="profile-picture">
                    <ProfilePicture imageUrl={user.profilePicture ?? null} username={user.username} />
                </div>
                <h1>{user.username}</h1>
                <p>Email: {user.email}</p>
                <p>Joined: {new Date(user.createdAt).toUTCString()}</p>
            </section>

            

            {/* Account Section */}
            <section className="section account" id="account">
                <h2>Account Settings</h2>
                <p>Manage your account settings and preferences.</p>
                <button className="edit-profile-btn" onClick={handleEditProfile}>
                    Edit Profile
                </button>
                <button className="delete-account-btn" onClick={handleDeleteAccount}>Delete Account</button>
            </section>
        </div>
    );
}
