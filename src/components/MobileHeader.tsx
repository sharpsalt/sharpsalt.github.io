import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const profileImg = new URL('../assets/profile.jpg', import.meta.url).toString();

const navItems = [
  { path: '/', label: 'home' },
  { path: '/blog', label: 'blog' },
  { path: '/about', label: 'about' },
  { path: '/resources', label: 'resources' },
] as const;

const MobileHeader: React.FC = React.memo(() => {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useAppContext();

  return (
    <>
      <header className="mobile-header">
        <h1 className="mobile-title">srija</h1>
        <button
          className={`menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </header>

      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-content">
          <div className="avatar-container">
            <img src={profileImg} alt="Srija" className="avatar-img" />
          </div>
          <h1 className="site-title">srija</h1>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
});

MobileHeader.displayName = 'MobileHeader';

export default MobileHeader;
