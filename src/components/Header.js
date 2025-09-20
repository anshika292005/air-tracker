import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plane, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <Plane className="logo-icon" />
          <h1>FlightTracker</h1>
        </div>

        <nav className="nav">
          <div className="nav-links">
            <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
            <Link to="/deals" className={isActive('/deals') ? 'active' : ''}>Deals</Link>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
            {user ? (
              <div className="user-menu">
                <Link to="/dashboard" className={`user-link ${isActive('/dashboard') ? 'active' : ''}`}>
                  <User className="user-icon" />
                  {user.firstName}
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut className="logout-icon" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/signin" className={isActive('/signin') ? 'active' : ''}>Sign In</Link>
            )}
          </div>

          <button
            className="mobile-menu-btn"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/deals" className={isActive('/deals') ? 'active' : ''} onClick={() => setIsOpen(false)}>Deals</Link>
        <Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={() => setIsOpen(false)}>Contact</Link>
        {user ? (
          <>
            <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''} onClick={() => setIsOpen(false)}>
              <User className="user-icon" />
              Dashboard
            </Link>
            <button className="logout-btn mobile" onClick={handleLogout}>
              <LogOut className="logout-icon" />
              Logout
            </button>
          </>
        ) : (
          <Link to="/signin" className={isActive('/signin') ? 'active' : ''} onClick={() => setIsOpen(false)}>Sign In</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
