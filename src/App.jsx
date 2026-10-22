import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ContentPage from './pages/ContentPage.jsx';
import PlanVisitPage from './pages/PlanVisitPage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, [pathname]);
  return null;
}

export default function App() {
  return <><ScrollToTop /><Routes><Route element={<SiteLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<ContentPage page="about" />} />
    <Route path="/heritage" element={<ContentPage page="heritage" />} />
    <Route path="/historic-square" element={<ContentPage page="square" />} />
    <Route path="/attractions" element={<ContentPage page="attractions" />} />
    <Route path="/events" element={<ContentPage page="events" />} />
    <Route path="/getting-here" element={<ContentPage page="gettingHere" />} />
    <Route path="/plan-your-visit" element={<PlanVisitPage />} />
    <Route path="/support" element={<SupportPage />} />
    <Route path="/faq" element={<ContentPage page="faq" />} />
    <Route path="/privacy" element={<ContentPage page="privacy" />} />
    <Route path="/culture" element={<Navigate to="/heritage" replace />} />
    <Route path="/things-to-do" element={<Navigate to="/attractions" replace />} />
    <Route path="/visit-columbia" element={<Navigate to="/plan-your-visit" replace />} />
    <Route path="/map" element={<Navigate to="/getting-here" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route></Routes></>;
}
