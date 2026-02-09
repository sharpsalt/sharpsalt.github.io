import React from 'react';
import { Link } from 'react-router-dom';
import FadeInSection from '../components/FadeInSection';

interface Resource {
  title: string;
  author: string;
  desc: string;
  link?: string;
  linkText?: string;
}

interface ResourceSection {
  heading: string;
  items: Resource[];
}

const sections: ResourceSection[] = [
  {
    heading: 'essential reads',
    items: [
      {
        title: 'clean code',
        author: 'robert c. martin',
        desc: 'how to write code that humans can actually understand.',
      },
      {
        title: 'eloquent javascript',
        author: 'marijn haverbeke',
        desc: 'the best free book on javascript, from basics to advanced.',
        link: 'https://eloquentjavascript.net/',
        linkText: 'read free →',
      },
      {
        title: 'you don\'t know js',
        author: 'kyle simpson',
        desc: 'deep dive into the mechanics of javascript.',
        link: 'https://github.com/getify/You-Dont-Know-JS',
        linkText: 'view repo →',
      },
      {
        title: 'designing data-intensive applications',
        author: 'martin kleppmann',
        desc: 'the bible for understanding modern backend systems.',
      },
    ],
  },
  {
    heading: 'learning platforms',
    items: [
      {
        title: 'the odin project',
        author: 'community-driven',
        desc: 'best free full-stack curriculum on the internet.',
        link: 'https://www.theodinproject.com/',
        linkText: 'start learning →',
      },
      {
        title: 'fullstackopen',
        author: 'university of helsinki',
        desc: 'deep dive into modern web development with react & node.',
        link: 'https://fullstackopen.com/',
        linkText: 'take course →',
      },
      {
        title: 'javascript.info',
        author: 'ilya kantor',
        desc: 'comprehensive modern javascript tutorial.',
        link: 'https://javascript.info/',
        linkText: 'visit →',
      },
    ],
  },
  {
    heading: 'tools i use',
    items: [
      {
        title: 'vs code',
        author: 'microsoft',
        desc: 'the editor. with vim keybindings obviously.',
      },
      {
        title: 'warp / windows terminal',
        author: '',
        desc: 'modern terminal that doesn\'t feel like 1995.',
      },
      {
        title: 'figma',
        author: '',
        desc: 'for ui/ux design and prototyping.',
      },
      {
        title: 'notion',
        author: '',
        desc: 'second brain for notes, docs, and project management.',
      },
    ],
  },
  {
    heading: 'build from scratch',
    items: [
      {
        title: 'build your own x',
        author: 'codecrafters',
        desc: 'tutorials for building git, docker, databases from scratch.',
        link: 'https://github.com/codecrafters-io/build-your-own-x',
        linkText: 'view repo →',
      },
      {
        title: 'project-based learning',
        author: 'community',
        desc: 'curated list of project-based tutorials.',
        link: 'https://github.com/practical-tutorials/project-based-learning',
        linkText: 'view repo →',
      },
    ],
  },
];

const ResourcesPage: React.FC = React.memo(() => {
  return (
    <div className="page">
      <FadeInSection>
        <h1 className="page-title">resources</h1>
        <p className="page-subtitle">constantly updated as i find more good stuff</p>
      </FadeInSection>

      {sections.map((section, sIdx) => (
        <React.Fragment key={section.heading}>
          <div className="section-divider" />
          <FadeInSection delay={sIdx * 80}>
            <section className="section">
              <h2 className="section-title">{section.heading}</h2>
              <div className="resource-list">
                {section.items.map((item, iIdx) => (
                  <div className="resource-item" key={iIdx}>
                    <h3 className="resource-name">{item.title}</h3>
                    {item.author && (
                      <span className="resource-author">{item.author}</span>
                    )}
                    <p className="resource-desc">{item.desc}</p>
                    {item.link && (
                      <a
                        href={item.link}
                        className="resource-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.linkText || 'visit →'}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </FadeInSection>
        </React.Fragment>
      ))}

      <div className="back-link-container">
        <Link to="/" className="back-link">← back to home</Link>
      </div>
    </div>
  );
});

ResourcesPage.displayName = 'ResourcesPage';

export default ResourcesPage;
