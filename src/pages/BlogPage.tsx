import React from 'react';
import { Link } from 'react-router-dom';
import FadeInSection from '../components/FadeInSection';

interface BlogPost {
  date: string;
  title: string;
  tag: string;
  slug: string;
}

const posts: BlogPost[] = [
  {
    date: '2026-02-01',
    title: 'building my personal website from scratch',
    tag: 'dev',
    slug: '#',
  },
  {
    date: '2026-01-15',
    title: 'why every developer should learn the terminal',
    tag: 'tools',
    slug: '#',
  },
  {
    date: '2025-12-20',
    title: 'my journey into web development',
    tag: 'personal',
    slug: '#',
  },
];

const BlogPage: React.FC = React.memo(() => {
  return (
    <div className="page">
      <FadeInSection>
        <h1 className="page-title">blog</h1>
        <p className="page-subtitle">all opinions are my own</p>
      </FadeInSection>

      <div className="blog-list">
        {posts.map((post, idx) => (
          <FadeInSection key={idx} delay={idx * 80}>
            <a href={post.slug} className="blog-entry">
              <h2 className="blog-entry-title">{post.title}</h2>
              <div className="blog-entry-meta">
                <span className="blog-entry-date">{post.date}</span>
                <span className="blog-entry-tag">{post.tag}</span>
              </div>
            </a>
          </FadeInSection>
        ))}
      </div>

      <div className="back-link-container">
        <Link to="/" className="back-link">← back to home</Link>
      </div>
    </div>
  );
});

BlogPage.displayName = 'BlogPage';

export default BlogPage;
