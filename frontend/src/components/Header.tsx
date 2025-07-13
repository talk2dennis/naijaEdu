// src/components/Header.tsx
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.jpg';
import './css/Header.css';
import { useNavigate } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';


export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // log the user data
  console.log("Current user in Header:", user);

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  return (
    <header className="app-header">
      <div
        className="logo-container"
        onClick={() => navigate('/')}
      >
        <div className='logo'><img src={logo} height={50} /></div>
        <h1 className="app-title">NaijaEdu</h1>
      </div>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/chat" className="nav-link" onClick={() => setMenuOpen(false)}>Chat</NavLink>
        {!isAuthenticated && (
          <>
            <NavLink to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</NavLink>
            <NavLink to="/register" className="nav-link" onClick={() => setMenuOpen(false)}>Register</NavLink>
          </>
        )}

        {isAuthenticated && (
          <>
            <NavLink to="/history" className="nav-link" onClick={() => setMenuOpen(false)}>
              Chat History
              <span className='notification'> ({user?.content?.length ?? 0})</span>
            </NavLink>
            <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
            <div style={{ width: '40px', height: '40px', fontSize: '14px'}} onClick={() => { navigate('/profile'); }} >
              <ProfilePicture imageUrl={user?.profilePicture ?? null} username={user?.username.split('@')[0] ?? ''} />
            </div>
          </>
        )}
      </nav>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
