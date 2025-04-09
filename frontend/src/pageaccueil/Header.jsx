// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/panier', text: 'سلتي', icon: 'shopping-cart' },
    { to: '/histoire', text: 'القصص', icon: 'book-open' },
    { to: '/roman', text: 'الروايات', icon: 'book' },
    { to: '/livre', text: 'الكتب', icon: 'books' },
    { to: '/menu', text: 'قائمة', icon: 'list' },
    { to: '/', text: 'الرئيسية', icon: 'home' },
  ];

  return (
    <header className={`header-glass ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-xl">
        <nav className="d-flex align-items-center justify-content-between py-2">
          {/* Left Section - Icons */}
          <div className="d-flex gap-3 align-items-center">
            <Link to="/rech" className="icon-hover" aria-label="بحث">
              <i className="fas fa-search"></i>
            </Link>
            <Link to="/contacts" className="icon-hover" aria-label="اتصل بنا">
              <i className="fas fa-envelope"></i>
            </Link>
          </div>

          {/* Center Section - Navigation */}
          <div className={`d-none d-lg-flex gap-4 position-relative ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className={`nav-link fw-semibold position-relative ${location.pathname === link.to ? 'active' : ''}`}
              >
                <i className={`fas fa-${link.icon} me-1`}></i>
                {link.text}
              </Link>
            ))}
          </div>

          {/* Right Section - Logo */}
          <div className="logo-container">
            <Link to="/">
              <img 
                src="./اقرا-removebg-preview (1).png" 
                alt="Iqra Logo" 
                className="logo-hover"
                width="80"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn d-lg-none" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className={`mobile-nav-link ${location.pathname === link.to ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className={`fas fa-${link.icon} me-2`}></i>
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}