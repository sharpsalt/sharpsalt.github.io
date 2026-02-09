import React from 'react';

const links = [
  { label: 'github', url: 'https://github.com/', icon: '⌥' },
  { label: 'x/twtr', url: 'https://x.com/', icon: '✦' },
  { label: 'linkedin', url: 'https://linkedin.com/', icon: '◆' },
] as const;

const Footer: React.FC = React.memo(() => {
  return (
    <footer className="footer">
      <div className="footer-links">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="footer-link-icon">{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>
      <div className="footer-divider" />
      <div className="footer-copy">
        <span className="footer-terminal">
          <span className="footer-prompt">$</span> echo &quot;crafted with ♥ by srijan &bull; © 2026&quot;
        </span>
      </div>
      <div className="footer-built-with">
        <span>react</span>
        <span className="footer-dot">·</span>
        <span>typescript</span>
        <span className="footer-dot">·</span>
        <span>parcel</span>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
