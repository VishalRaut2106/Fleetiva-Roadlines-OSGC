import { Link } from "react-router-dom";
import { useState } from "react";

export default function LandingNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="landing-navbar">
            <div className="landing-navbar-content">
                <Link to="/" className="landing-navbar-brand" onClick={closeMobileMenu}>
                    <span aria-hidden>🚚</span>
                    <span>Fleetiva Roadlines</span>
                </Link>

                {/* Hamburger Menu Button */}
                <button
                    className="landing-navbar-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <span className={`hamburger-landing ${mobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                {/* Navigation Links */}
                <div className={`landing-navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <a href="#features" className="landing-nav-link" onClick={closeMobileMenu}>
                        Features
                    </a>
                    <a href="#how-it-works" className="landing-nav-link" onClick={closeMobileMenu}>
                        How It Works
                    </a>
                    <a href="#about" className="landing-nav-link" onClick={closeMobileMenu}>
                        About
                    </a>
                </div>

                {/* CTA Buttons */}
                <div className={`landing-navbar-actions ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <Link to="/login" className="btn btn-glass-landing" onClick={closeMobileMenu}>
                        Sign In
                    </Link>
                    <Link to="/register" className="btn btn-glow-landing" onClick={closeMobileMenu}>
                        Get Started
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && <div className="landing-navbar-overlay" onClick={closeMobileMenu}></div>}
        </nav>
    );
}
