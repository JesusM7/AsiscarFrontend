import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { getRoleDisplayName, getRoleIcon } from '../utils/roleUtils';
import './Navbar.css';
import logoSvg from '../assets/AsisCarLogo.svg';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar" ref={menuRef}>
        <div className="navbar-container">
          <Link to="/cliente/home" className="navbar-brand">
            <img src={logoSvg} alt="AsisCar Logo" className="navbar-logo" />
          </Link>

          {/* Hamburger Menu Button */}
          <button 
            className="hamburger-menu" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
          </button>

          <div className={`navbar-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {isAuthenticated ? (
              <>
                <div className="navbar-links">
                  <Link 
                    to="/cliente/home" 
                    className={`navbar-link ${isCurrentPath('/cliente/home') ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    🏠 Inicio
                  </Link>
                  <Link 
                    to="/servicios" 
                    className={`navbar-link ${isCurrentPath('/servicios') ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    🛠️ Servicios
                  </Link>
                  {user?.userType === 'cliente' && (
                    <Link 
                      to="/cliente/solicitar" 
                      className={`navbar-link ${isCurrentPath('/cliente/solicitar') ? 'active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      📝 Solicitar
                    </Link>
                  )}
                  {user?.userType === 'admin' && (
                    <Link 
                      to="/admin" 
                      className={`navbar-link ${isCurrentPath('/admin') ? 'active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      ⚙️ Panel Admin
                    </Link>
                  )}
                </div>

                <div className="navbar-user">
                  <div className="user-info">
                    <span className="user-email">{user?.username}</span>
                    <span className="user-role">
                      {getRoleIcon(user?.userType)} {getRoleDisplayName(user?.userType)}
                    </span>
                  </div>
                  <button onClick={handleLogout} className="logout-btn">
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <div className="navbar-auth">
                <Link 
                  to="/login" 
                  className={`navbar-link ${isCurrentPath('/login') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  🔐 Iniciar Sesión
                </Link>
                <Link 
                  to="/register" 
                  className={`navbar-link register ${isCurrentPath('/register') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  📝 Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}
    </>
  );
};

export default Navbar; 