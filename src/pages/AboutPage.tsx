import React from 'react';
import { Link } from 'react-router-dom';
import FadeInSection from '../components/FadeInSection';

interface SkillGroup {
  category: string;
  items: string;
}

const skills: SkillGroup[] = [
  { category: 'languages', items: 'javascript, typescript, python, html, css, sql' },
  { category: 'frontend', items: 'react, next.js, tailwind css, sass, redux' },
  { category: 'backend', items: 'node.js, express, fastapi, rest apis, graphql' },
  { category: 'tools & infra', items: 'git, docker, aws, firebase, postgresql, mongodb' },
];

const AboutPage: React.FC = React.memo(() => {
  return (
    <div className="page">
      <FadeInSection>
        <h1 className="page-title">Srijan Verma</h1>
        <p className="about-location">developer, building from anywhere</p>
        <p className="about-bio">
          passionate full stack developer with a love for building clean, 
          performant web applications. interested in developer tools, 
          open source, and making the web a better place.
        </p>
      </FadeInSection>

      <div className="section-divider" />

      <FadeInSection delay={100}>
        <section className="section">
          <h2 className="section-title">skills</h2>
          <div className="skills-grid">
            {skills.map((group) => (
              <div className="skill-group" key={group.category}>
                <h3 className="skill-category">{group.category}</h3>
                <p className="skill-items">{group.items}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      <div className="section-divider" />

      <FadeInSection delay={200}>
        <section className="section">
          <h2 className="section-title">contact</h2>
          <div className="contact-list">
            <div className="contact-item">
              <span className="contact-label">email:</span>
              <a href="mailto:srija@example.com" className="contact-value">srija@example.com</a>
            </div>
            <div className="contact-item">
              <span className="contact-label">github:</span>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="contact-value">github.com/srija</a>
            </div>
          </div>
        </section>
      </FadeInSection>

      <div className="back-link-container">
        <Link to="/" className="back-link">← back to home</Link>
      </div>
    </div>
  );
});

AboutPage.displayName = 'AboutPage';

export default AboutPage;
