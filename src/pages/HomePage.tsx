import React from 'react';
import Hero from '../components/Hero';
import Work from '../components/Work';
import Projects from '../components/Projects';
import Posts from '../components/Posts';
import Aesthetic from '../components/Aesthetic';
import Footer from '../components/Footer';

const HomePage: React.FC = React.memo(() => {
  return (
    <>
      <Hero />
      <div className="section-divider" />
      <Work />
      <div className="section-divider" />
      <Projects />
      <div className="section-divider" />
      <Posts />
      <div className="section-divider" />
      <Aesthetic />
      <Footer />
    </>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
