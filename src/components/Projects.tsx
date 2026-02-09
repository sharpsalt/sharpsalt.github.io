import React from 'react';
import FadeInSection from './FadeInSection';
import TiltCard from './TiltCard';

interface Project {
  name: string;
  url: string;
  desc: string;
  wip?: boolean;
}

const projects: Project[] = [
  { name: 'taskflow', url: 'https://github.com/', desc: 'real-time collaborative task management app with websockets', wip: true },
  { name: 'pixelart-editor', url: 'https://github.com/', desc: 'browser-based pixel art editor with export capabilities', wip: true },
  { name: 'markdown-notes', url: 'https://github.com/', desc: 'minimal markdown note-taking app with local storage' },
  { name: 'weather-cli', url: 'https://github.com/', desc: 'command-line weather app using openweathermap api in python' },
  { name: 'sorting-visualizer', url: 'https://github.com/', desc: 'interactive sorting algorithm visualizer with step-by-step animation' },
  { name: 'portfolio-gen', url: 'https://github.com/', desc: 'static portfolio site generator from a single config file' },
];

const Projects: React.FC = React.memo(() => {
  return (
    <section className="section" id="projects">
      <FadeInSection>
        <h2 className="section-title">projects</h2>

        <div className="projects-list">
          {projects.map((project, idx) => (
            <TiltCard key={idx} className="project-item" intensity={6}>
              <div className="project-header">
                <a
                  href={project.url}
                  className="project-name"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.name}
                </a>
                {project.wip && <span className="project-badge wip">wip</span>}
              </div>
              <p className="project-desc">{project.desc}</p>
            </TiltCard>
          ))}
        </div>

        <a
          href="https://github.com/"
          className="all-projects-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          all projects →
        </a>
      </FadeInSection>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
