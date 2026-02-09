import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/appContextStore";
import { safeStorage } from "../utils/storage";

const getRole = (user) => user?.role || safeStorage.get("role") || "customer";

export default function Navbar() {
    const { user, logout } = useContext(AppContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const role = getRole(user);

    if (!user) return null;

    const dashboardRoute =
        role === "superadmin"
            ? "/superadmin"
            : role === "admin"
                ? "/admin"
                : role === "driver"
                    ? "/driver"
                    : "/dashboard";

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <NavLink to={dashboardRoute} className="navbar-brand" onClick={closeMobileMenu}>
                    <span aria-hidden>🚚</span>
                    Fleetiva Roadlines
                </NavLink>

                {/* Hamburger Menu Button */}
                <button
                    className="navbar-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                {/* Navigation Links */}
                <div className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <NavLink to={dashboardRoute} className="nav-link" onClick={closeMobileMenu}>
                        Dashboard
                    </NavLink>
                    {role === "superadmin" && (
                        <>
                            <NavLink to="/superadmin" className="nav-link" onClick={closeMobileMenu}>
                                Company Management
                            </NavLink>
                            <NavLink to="/superadmin/logs" className="nav-link" onClick={closeMobileMenu}>
                                System Logs
                            </NavLink>
                        </>
                    )}
                    {role === "customer" && (
                        <NavLink to="/post-load" className="nav-link" onClick={closeMobileMenu}>
                            Post Load
                        </NavLink>
                    )}
                    {role === "driver" && (
                        <NavLink to="/post-truck" className="nav-link" onClick={closeMobileMenu}>
                            Post Truck
                        </NavLink>
                    )}
                </div>

                {/* User Actions */}
                <div className={`navbar-actions ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <span className="chip">{user?.email || "Signed in"}</span>
                    <span className="chip">Role: {role}</span>
                    <button onClick={() => { logout(); closeMobileMenu(); }} className="btn btn-danger">
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && <div className="navbar-overlay" onClick={closeMobileMenu}></div>}
        </nav>
    );
}
