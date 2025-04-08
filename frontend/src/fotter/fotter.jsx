import React from 'react';
import { Link } from 'react-router-dom';
import "./fotter.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <nav className="footer-nav">
          <Link to="/cont" className="footer-link">تواصل معنا</Link>
          <Link to="/" className="footer-link">اقرأ</Link>
        </nav>

        <nav className="footer-copy">
          <span>© {new Date().getFullYear()} جميع الحقوق محفوظة. <a href="#">الحقوق النشر والطبع</a></span>
        </nav>

        <nav className="footer-social">
          <a href="#" className="footer-social-link" aria-label="Facebook">
            <img src="./facebook (6).png" alt="Facebook" className="footer-social-icon" />
          </a>
          <a href="#" className="footer-social-link" aria-label="Social">
            <img src="./social (6).png" alt="Social" className="footer-social-icon" />
          </a>
        </nav>
      </div>
    </footer>
  );
}


