// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header-glass">
      
      <div className="container-xl">
        <nav className="d-flex align-items-center justify-content-between py-2">
          {/* Left Section - Icons */}
          <div className="d-flex gap-4 align-items-center">
            <Link to="/rech" className="icon-hover">
              <img src="./search.png" alt="Search" width="28" className="img-fluid" />
            </Link>
            <Link to="/contacts" className="icon-hover">
              <img src="./contact (1).png" alt="Contact" width="28" className="img-fluid" />
            </Link>
          </div>

          {/* Center Section - Navigation */}
          <div className="d-none d-lg-flex gap-5 position-relative">
            {[
              { to: '/panier', text: 'سلتي' },
              { to: '/histoire', text: 'القصص' },
              { to: '/roman', text: 'الروايات' },
              { to: '/livre', text: 'الكتب' },
              { to: '/menu', text: 'قائمة' },
              { to: '/', text: 'الرئيسية' },
            ].map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="nav-link fw-semibold position-relative"
                style={{color:"blue"}}
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Right Section - Logo */}
          <div className="logo-container">
            <img 
              src="./اقرا-removebg-preview (1).png" 
              alt="Iqra Logo" 
              className="logo-hover"
              width="80"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}