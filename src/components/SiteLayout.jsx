import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X, MapPin, Instagram, Facebook, Youtube, ChevronUp } from 'lucide-react';

const navLinks = [
  { label: 'Discover', to: '/about' },
  { label: 'Things to do', to: '/attractions' },
  { label: 'Culture', to: '/heritage' },
  { label: 'Events', to: '/events' },
];

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 22);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape); };
  }, [open]);

  return (
    <>
      <motion.header className={`site-header${scrolled ? ' site-header-scrolled' : ''}`} initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}>
        <div className="nav-inner page-container">
          <Link to="/" className="brand" aria-label="Columbia, Tennessee home">
            <span className="brand-wordmark">COLUMBIA</span><span className="brand-subline">TENNESSEE</span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-item${isActive ? ' nav-item-active' : ''}`}>{link.label}</NavLink>)}
          </nav>
          <div className="nav-actions">
            <Link to="/plan-your-visit" className="nav-cta">Plan your visit <ArrowUpRight size={14} /></Link>
            <button className="mobile-menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .22 }}>
          <div className="mobile-menu-heading"><span>FIND YOUR COLUMBIA</span><span>01 — 08</span></div>
          {[{ label: 'Home', to: '/' }, ...navLinks, { label: 'Historic Square', to: '/historic-square' }, { label: 'Plan your visit', to: '/plan-your-visit' }, { label: 'Getting here', to: '/getting-here' }, { label: 'Contact & support', to: '/support' }].map((link, index) => <NavLink key={link.to} end={link.to === '/'} to={link.to} className="mobile-menu-link"><span className="mobile-menu-number">{String(index + 1).padStart(2, '0')}</span><span>{link.label}</span><ArrowUpRight size={17} /></NavLink>)}
          <p className="mobile-menu-foot"><MapPin size={14} /> Middle Tennessee · South of Nashville</p>
        </motion.div>}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main page-container">
        <div className="footer-brand-column">
          <Link to="/" className="footer-brand"><span className="footer-brand-mark">C</span><span>COLUMBIA<small>TENNESSEE</small></span></Link>
          <p>A little town.<br /><em>A lot to discover.</em></p>
          <div className="footer-socials" aria-label="Social media"><a href="https://www.facebook.com/VisitColumbiaTN/" target="_blank" rel="noreferrer" aria-label="Visit Columbia on Facebook"><Facebook size={16} /></a><a href="https://www.instagram.com/visitcolumbiatn/" target="_blank" rel="noreferrer" aria-label="Visit Columbia on Instagram"><Instagram size={16} /></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={16} /></a></div>
        </div>
        <div className="footer-column"><h2>EXPLORE</h2><Link to="/about">Meet Columbia</Link><Link to="/historic-square">Historic downtown</Link><Link to="/attractions">Things to do</Link><Link to="/heritage">History & culture</Link><Link to="/events">Events & traditions</Link></div>
        <div className="footer-column"><h2>MAKE A PLAN</h2><Link to="/plan-your-visit">Build an itinerary</Link><Link to="/getting-here">Getting here</Link><Link to="/faq">Visitor FAQs</Link><Link to="/support">Contact & support</Link><a href="https://www.visitcolumbiatn.com/" target="_blank" rel="noreferrer">Official tourism site <ArrowUpRight size={12} /></a></div>
        <div className="footer-contact">
          <h2>VISITOR WELCOME CENTER</h2>
          <p>713 N. Main Street<br />Columbia, TN 38401</p>
          <a href="tel:+19315601506">931 560 1506</a>
          <a href="https://maps.google.com/?q=713+N+Main+Street+Columbia+TN+38401" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={13} /></a>
          <a href="mailto:kmurphy@columbiatn.gov">Email the tourism team</a>
        </div>
      </div>
      <div className="footer-bottom page-container"><span>© {new Date().getFullYear()} Columbia, Tennessee · Visitor inspiration and planning.</span><div><Link to="/privacy">Privacy</Link><Link to="/faq">FAQs</Link><a href="https://www.visitcolumbiatn.com/" target="_blank" rel="noreferrer">Visit Columbia ↗</a></div><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <ChevronUp size={14} /></button></div>
    </footer>
  );
}

export default function SiteLayout() {
  return <div className="site-shell" id="page-top"><a className="skip-link" href="#main-content">Skip to content</a><SiteNavigation /><main id="main-content"><Outlet /></main><SiteFooter /></div>;
}
