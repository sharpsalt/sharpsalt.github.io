import React from 'react';
import FadeInSection from './FadeInSection';

interface Post {
  date: string;
  title: string;
  url: string;
}

const posts: Post[] = [
  { date: '2026-02-01', title: 'building my personal website from scratch', url: '#' },
  { date: '2026-01-15', title: 'why every developer should learn the terminal', url: '#' },
  { date: '2025-12-20', title: 'my journey into web development', url: '#' },
];

const Posts: React.FC = React.memo(() => {
  return (
    <section className="section" id="posts">
      <FadeInSection>
        <h2 className="section-title">recent posts</h2>

        <div className="posts-list">
          {posts.map((post, idx) => (
            <a href={post.url} className="post-item" key={idx}>
              <span className="post-date">{post.date}</span>
              <span className="post-title">{post.title}</span>
            </a>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
});

Posts.displayName = 'Posts';

export default Posts;
