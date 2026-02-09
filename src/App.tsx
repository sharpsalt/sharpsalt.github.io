import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { useBodyScrollLock, useMediaQuery } from './hooks';

/* ── Static (always rendered) components ── */
import Scanlines from './components/Scanlines';
import GlowCursor from './components/GlowCursor';
import ScrollProgress from './components/ScrollProgress';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import PageLoader from './components/PageLoader';
import AmbientOrbs from './components/AmbientOrbs';
import StatusBar from './components/StatusBar';

/* ── Lazy-loaded heavy components (code-split) ── */
const ParticleField = lazy(() => import('./components/ParticleField'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const BootLoader = lazy(() => import('./components/BootLoader'));

/* ── Lazy-loaded pages (route-based code splitting) ── */
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));

/* ── Page transition wrapper ── */
const PageWrapper: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname]);

  return (
    <div className={`page-transition ${visible ? 'page-enter' : ''}`}>
      {children}
    </div>
  );
});

PageWrapper.displayName = 'PageWrapper';

/* ── Main layout ── */
const AppLayout: React.FC = () => {
  const { mobileMenuOpen, closeMobileMenu } = useAppContext();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  // Lock body scroll when mobile menu is open
  useBodyScrollLock(mobileMenuOpen);

  return (
    <>
      <AmbientOrbs />
      <Scanlines />
      {!isMobile && <GlowCursor />}
      <Suspense fallback={null}>
        <ParticleField />
        <CommandPalette />
      </Suspense>
      <ScrollProgress />
      <Sidebar />
      <MobileHeader />
      <main className="main-content">
        <PageWrapper>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
            </Routes>
          </Suspense>
        </PageWrapper>
      </main>
      <StatusBar />
    </>
  );
};

/* ── Root App ── */
const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  useEffect(() => {
    if (booted) {
      requestAnimationFrame(() => setLoaded(true));
    }
  }, [booted]);

  return (
    <HashRouter>
      <AppProvider>
        {!booted && (
          <Suspense fallback={null}>
            <BootLoader onComplete={handleBootComplete} />
          </Suspense>
        )}
        <div className={`app ${loaded ? 'app--loaded' : ''}`} style={{ display: booted ? undefined : 'none' }}>
          <AppLayout />
        </div>
      </AppProvider>
    </HashRouter>
  );
};

export default App;
