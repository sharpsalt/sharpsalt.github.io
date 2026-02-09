import React from 'react';
import FadeInSection from './FadeInSection';

interface WorkItem {
  company: string;
  role: string;
  period: string;
}

const workItems: WorkItem[] = [
  // { company: 'tech startup', role: 'full stack developer', period: '2024 - present' },
  // { company: 'web agency', role: 'frontend developer', period: '2022 - 2024' },
  { company: 'freelance', role: 'Backend developer', period: '2026 - present' },
] as const;

const Work: React.FC = React.memo(() => {
  return (
    <section className="section" id="work">
      <FadeInSection>
        <h2 className="section-title">work</h2>

        <div className="work-highlight">
          <span className="work-status">
            <span className="pulse-dot" />
            working on
          </span>
          <a href="#" className="work-highlight-name">Codexa</a>
          <p className="work-highlight-desc">a modern online judge</p>
        </div>

        <div className="work-list">
          {workItems.map((item, idx) => (
            <div className="work-item" key={idx}>
              <div className="work-item-left">
                <span className="work-company">{item.company}</span>
                <span className="work-role">{item.role}</span>
              </div>
              <div className="work-item-right">
                <span className="work-period">({item.period})</span>
              </div>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
});

Work.displayName = 'Work';

export default Work;
