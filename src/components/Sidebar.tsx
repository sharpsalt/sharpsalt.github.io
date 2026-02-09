import React from 'react';
import { NavLink } from 'react-router-dom';

const profileImg = new URL('../assets/profile.jpg', import.meta.url).toString();

const navItems = [
  { path: '/', label: 'home', icon: '~' },
  { path: '/blog', label: 'blog', icon: '✎' },
  { path: '/about', label: 'about', icon: '◉' },
  { path: '/resources', label: 'resources', icon: '◈' },
] as const;

const Sidebar: React.FC = React.memo(() => {
  return (
    <nav className="sidebar">
      <div className="sidebar-inner">
        <div className="avatar-container">
          <img src={profileImg} alt="Srijan" className="avatar-img" />
        </div>

        <h1 className="site-title glitch" data-text="srijan">Srijan Verma</h1>
        <span className="site-tagline">full stack developer</span>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar-status">
          <span className="status-dot" />
          <span className="status-text">online</span>
        </div>

        <div className="sidebar-cmd-hint">
          <kbd>ctrl</kbd> + <kbd>K</kbd>
        </div>
      </div>
    </nav>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
