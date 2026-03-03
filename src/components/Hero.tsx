import React, { useEffect, useState, useMemo } from 'react';
import FadeInSection from './FadeInSection';
import TextScramble from './TextScramble';
import { useTypingEffect } from '../hooks';

const techStack = ['Node.js','React','TypeScript','Python','Pytorch','Rust','JavaScript','C/C++','Git/Github','Assembly','Docker','Kubernetes','Databases'] as const;

const Hero: React.FC = React.memo(() => {
  const [showContent, setShowContent] = useState(false);
  const typedText = useTypingEffect('building something cool', 55, showContent);

  useEffect(() => {
    const delay = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(delay);
  }, []);

  const techTags = useMemo(
    () =>
      techStack.map((tech, idx) => (
        <span key={tech} className="tech-tag" style={{ animationDelay: `${idx * 0.1}s` }}>{tech}</span>
      )),
    []
  );

  return (
    <section className="hero" id="home">
      <FadeInSection>
        <div className="hero-greeting">
            {/* //  <span className="hero-wave"></span> */}
          <span className="hero-hi">hey, i'm</span>
        </div>

        <h2 className="hero-name-large">
          <TextScramble text="Srijan Verma" className="gradient-text" trigger={showContent} />
        </h2>

        <div className="hero-location">
          <span className="hero-badge">
            <span className="hero-badge-dot" />
            remote
          </span>
          <span className="hero-divider-dot">·</span>
          <span className="hero-badge">currently not available for work</span>
        </div>

        <h3 className="hero-role">
          <span className="hero-role-bracket">&lt;</span>
          <TextScramble text=" Backend / Machine Learning" trigger={showContent} />
          <span className="hero-role-bracket"> /&gt;</span>
        </h3>

        <p className="hero-desc">
          developer, builder, lifelong learner. passionate about computers, programming, and creating things that make a difference. always exploring new technologies and ideas to grow and improve.
        </p>

        <div className="hero-meta">
          <p className="hero-reading">
            <span className="meta-label">currently reading:</span>
            <em>An Introduction to Hidden Markov Models and Bayesian Networks</em>
          </p>
          <p className="hero-mood">
            <span className="meta-label">&gt;</span>
            <span className="typed-text">{typedText}</span>
            <span className="cursor-blink">▎</span>
          </p>
        </div>

        <div className="hero-tech-stack">
          {techTags}
        </div>
      </FadeInSection>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
