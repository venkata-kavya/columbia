import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Compass, MapPin, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VISUALS = {
  downtown: '/images/downtown-editorial.jpg',
  heritage: '/images/heritage-home.jpg',
  river: '/images/duck-river.jpg',
  events: '/images/first-fridays-editorial.jpg',
  courthouse: '/images/downtown-editorial.jpg',
};

const destinations = [
  { id: '01', tag: 'HISTORY & HERITAGE', title: 'A past with presence.', detail: 'Presidential history, preserved architecture, and stories with roots.', image: VISUALS.heritage, alt: 'Illustrative editorial image of a historic Southern home', to: '/heritage', className: 'destination-card-tall' },
  { id: '02', tag: 'OUTDOORS', title: 'A little more outside.', detail: 'Follow the Duck River and find room to breathe.', image: VISUALS.river, alt: 'Illustrative editorial landscape of a quiet tree-lined river', to: '/attractions', className: '' },
  { id: '03', tag: 'DOWNTOWN', title: 'Take the long way.', detail: 'Independent shops, local flavor, and a landmark square.', image: VISUALS.downtown, alt: 'Illustrative editorial view of a small historic downtown at golden hour', to: '/historic-square', className: '' },
];

const events = [
  { eyebrow: 'A DOWNTOWN FAVORITE', title: 'First Fridays', copy: 'When the square fills with music, makers, food trucks and late-opening shops.', timing: 'APRIL — DECEMBER', image: VISUALS.events, to: 'https://www.visitcolumbiatn.com/events/first-fridays/' },
  { eyebrow: 'A SIGNATURE TRADITION', title: 'Mule Day', copy: 'A long-running local celebration of Maury County heritage and community.', timing: 'TYPICALLY EARLY APRIL', image: VISUALS.courthouse, to: 'https://www.muleday.com/' },
];

function Eyebrow({ children, light = false }) {
  return <div className={`eyebrow${light ? ' eyebrow-light' : ''}`}><span className="eyebrow-dot" />{children}</div>;
}

function ArrowLink({ to, children, light = false, external = false }) {
  const className = `text-link${light ? ' text-link-light' : ''}`;
  return external
    ? <a className={className} href={to} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={16} strokeWidth={1.6} /></a>
    : <Link className={className} to={to}>{children}<ArrowUpRight size={16} strokeWidth={1.6} /></Link>;
}

function DestinationCard({ item, index }) {
  return (
    <article className={`destination-card ${item.className}`} data-reveal>
      <Link to={item.to} className="destination-card-link" aria-label={`Explore ${item.tag.toLowerCase()}`}>
        <div className="destination-media">
          <img src={item.image} alt={item.alt} loading="lazy" />
          <span className="destination-index">{item.id}</span>
          <span className="destination-arrow"><ArrowUpRight size={20} /></span>
        </div>
        <div className="destination-copy">
          <span className="destination-tag">{item.tag}</span>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
        </div>
      </Link>
    </article>
  );
}

export default function HomePage() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        gsap.set('[data-hero-anim], [data-reveal], .destination-card, .hero-photo-main, .hero-photo-small', { clearProps: 'all' });
        return;
      }

      const hero = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });
      hero
        .fromTo('[data-hero-anim="eyebrow"]', { autoAlpha: 0, y: 16, letterSpacing: '0.28em' }, { autoAlpha: 1, y: 0, letterSpacing: '0.18em', duration: 0.72 })
        .fromTo('.hero-title-line', { autoAlpha: 0, yPercent: 115, rotateX: -7 }, { autoAlpha: 1, yPercent: 0, rotateX: 0, duration: 1.08, stagger: 0.12 }, '-=0.3')
        .fromTo('[data-hero-anim="body"]', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.11 }, '-=0.48')
        .fromTo('.hero-photo-main', { autoAlpha: 0, scale: 1.06, y: 24 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1.4, ease: 'power2.out' }, 0.15)
        .fromTo('.hero-photo-small', { autoAlpha: 0, y: 25, rotate: 4 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.95 }, '-=0.7');

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { y: 34, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.88, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
      gsap.utils.toArray('.destination-media img, .editorial-photo img, .event-card img').forEach((image) => {
        gsap.fromTo(image, { scale: 1.08 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: image, start: 'top 94%', end: 'bottom 20%', scrub: 0.55 },
        });
      });
      gsap.to('.hero-photo-main', {
        y: -48, ease: 'none',
        scrollTrigger: { trigger: '.home-hero', start: 'top top', end: 'bottom top', scrub: 0.65 },
      });
      gsap.to('.hero-contour', {
        y: -32, rotate: 5, ease: 'none',
        scrollTrigger: { trigger: '.home-hero', start: 'top top', end: 'bottom top', scrub: 1 },
      });
      gsap.fromTo('.stat-value', { y: 18, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 0.72, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.town-stats', start: 'top 86%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="hero-gradient" aria-hidden="true" />
        <svg className="hero-contour" viewBox="0 0 760 620" fill="none" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => <path key={i} d={`M ${-80 + i * 11} ${40 + i * 8} C ${200 + i * 10} ${-25 + i * 9}, ${320 + i * 15} ${450 - i * 9}, ${780 + i * 6} ${220 + i * 12}`} stroke="currentColor" strokeWidth="1" opacity={0.15 + (i % 4) * 0.035} />)}
        </svg>
        <div className="hero-layout page-container">
          <div className="hero-copy">
            <div className="eyebrow" data-hero-anim="eyebrow"><span className="eyebrow-dot" />MIDDLE TENNESSEE · CHARTERED 1807</div>
            <h1 id="hero-title" className="hero-title">
              <span className="hero-title-mask"><span className="hero-title-line">A little town.</span></span>
              <span className="hero-title-mask"><em className="hero-title-line">A lot to discover.</em></span>
            </h1>
            <p className="hero-subtitle" data-hero-anim="body">The best kind of getaway leaves room for a detour. Find historic streets, independent shops, river air, and Southern hospitality in Columbia, Tennessee.</p>
            <div className="hero-actions" data-hero-anim="body">
              <Link className="button button-primary" to="/attractions">Explore Columbia <ArrowUpRight size={17} /></Link>
              <Link className="button button-outline" to="/plan-your-visit">Plan your visit <ArrowRight size={16} /></Link>
            </div>
            <div className="hero-note" data-hero-anim="body"><MapPin size={15} /><span>Just south of Nashville, a world away from hurry.</span></div>
          </div>

          <div className="hero-visual" aria-label="A glimpse of Columbia's downtown, homes, and river landscapes">
            <div className="hero-image-halo" />
            <div className="hero-photo-main">
              <img src={VISUALS.downtown} alt="AI-generated editorial visualization of historic Southern downtown streets at golden hour" fetchPriority="high" />
              <div className="hero-photo-overlay"><span>01 / THE PLACE</span><strong>Take the scenic route.</strong></div>
            </div>
            <div className="hero-photo-small">
              <img src={VISUALS.river} alt="AI-generated editorial visualization of a quiet tree-lined Tennessee river" />
              <div><span>FIND YOUR OUTSIDE</span><ArrowUpRight size={16} /></div>
            </div>
            <div className="hero-stamp"><Compass size={24} strokeWidth={1.1} /><span>YOUR NEXT<br />GOOD STORY</span></div>
            <div className="hero-vertical-note">COLUMBIA · TENNESSEE</div>
          </div>
        </div>
        <div className="hero-bottom page-container">
          <a href="#discover" className="scroll-cue"><span className="scroll-cue-icon"><ArrowDown size={14} /></span><span>SCROLL TO DISCOVER</span></a>
          <div className="hero-microfacts"><span><i />A REAL TOWN WITH REAL CHARACTER</span><span><i />HISTORY · NATURE · COMMUNITY</span></div>
        </div>
      </section>

      <section className="discover-section page-container section-space" id="discover">
        <div className="section-heading section-heading-minimal" data-reveal>
          <div><Eyebrow>START WITH A FEELING</Eyebrow><h2>Find your kind of <em>somewhere.</em></h2></div>
          <div className="heading-aside"><p>One town, a thousand little ways to spend a day. Start with what calls to you, then follow the feeling.</p><ArrowLink to="/attractions">See all things to do</ArrowLink></div>
        </div>
        <div className="destination-grid">
          {destinations.map((item, index) => <DestinationCard item={item} index={index} key={item.id} />)}
        </div>
      </section>

      <section className="story-section section-space">
        <div className="story-layout page-container">
          <div className="editorial-photo story-photo" data-reveal>
            <img src={VISUALS.courthouse} alt="The historic Maury County courthouse tower in downtown Columbia, photographed by the official Visit Columbia tourism site" loading="lazy" />
            <div className="photo-caption"><span>THE HISTORIC DOWNTOWN DISTRICT</span><span>LOOK CLOSER ↗</span></div>
          </div>
          <div className="story-copy" data-reveal>
            <Eyebrow>ROOTED IN TENNESSEE</Eyebrow>
            <h2>Where history<br />meets the <em>horizon.</em></h2>
            <p>Columbia's story reaches from a landmark courthouse square to presidential history and the green corridors of the Duck River. The past is part of the place—but the town keeps making new memories, too.</p>
            <div className="story-list">
              <Link to="/historic-square"><span>01</span><span>Historic downtown</span><ArrowUpRight size={16} /></Link>
              <Link to="/heritage"><span>02</span><span>Heritage & the Polk Home</span><ArrowUpRight size={16} /></Link>
              <Link to="/attractions"><span>03</span><span>Rivers, parks & open spaces</span><ArrowUpRight size={16} /></Link>
            </div>
            <ArrowLink to="/about">Get to know Columbia</ArrowLink>
          </div>
        </div>
      </section>

      <section className="town-stats page-container" aria-label="Columbia at a glance">
        <div className="stat-intro" data-reveal><Eyebrow>THE QUICK TAKE</Eyebrow><h2>A place with<br /><em>a point of view.</em></h2></div>
        <div className="stat-item"><strong className="stat-value">1807</strong><span>CHARTERED</span><p>A Middle Tennessee town with a long story.</p></div>
        <div className="stat-item"><strong className="stat-value">45 mi</strong><span>SOUTH OF NASHVILLE</span><p>Close enough for a weekend. Far enough to reset.</p></div>
        <div className="stat-item"><strong className="stat-value">1 river</strong><span>DUCK RIVER COUNTRY</span><p>Fresh air and a different kind of pace.</p></div>
      </section>

      <section className="outdoors-section">
        <div className="outdoors-image"><img src={VISUALS.river} alt="AI-generated editorial visualization of a tree-lined river in Middle Tennessee" loading="lazy" /></div>
        <div className="outdoors-content">
          <Eyebrow>MAKE SPACE TO BREATHE</Eyebrow>
          <h2>Rivers, trails<br />and <em>open skies.</em></h2>
          <p>Follow the Duck River, spend time at Riverwalk Park, or explore the outdoor spaces around Maury County. Keep your plans flexible and check local conditions before heading out.</p>
          <ArrowLink to="/attractions">Explore the outdoors</ArrowLink>
          <div className="outdoors-coordinates"><MapPin size={14} /> DUCK RIVER · COLUMBIA, TN</div>
        </div>
      </section>

      <section className="events-section page-container section-space">
        <div className="section-heading events-heading" data-reveal>
          <div><Eyebrow>WHEN THE TOWN COMES ALIVE</Eyebrow><h2>Good things<br /><em>happen here.</em></h2></div>
          <div className="heading-aside"><p>From downtown evenings to a signature spring celebration, a little timing can turn a visit into a tradition.</p><ArrowLink to="/events">Explore the calendar</ArrowLink></div>
        </div>
        <div className="event-grid">
          {events.map((event, i) => (
            <article className="event-card" key={event.title} data-reveal>
              <a href={event.to} target="_blank" rel="noreferrer" className="event-card-image" aria-label={`Learn more about ${event.title}`}>
                <img src={event.image} alt={i === 0 ? 'AI-generated editorial visualization of a lively downtown evening market' : 'Official Visit Columbia photograph of the historic courthouse'} loading="lazy" />
                <span className="event-image-arrow"><ArrowUpRight size={18} /></span>
              </a>
              <div className="event-card-body"><div className="event-meta"><span>{event.eyebrow}</span><span>{event.timing}</span></div><h3>{event.title}</h3><p>{event.copy}</p><ArrowLink to={event.to} external>Official event details</ArrowLink></div>
            </article>
          ))}
        </div>
      </section>

      <section className="planner-banner">
        <div className="planner-banner-image"><img src={VISUALS.heritage} alt="AI-generated editorial visualization of a gracious historic Southern home" loading="lazy" /></div>
        <div className="planner-banner-content" data-reveal>
          <Eyebrow light>YOUR NEXT GOOD STORY</Eyebrow>
          <h2>Make the weekend <em>yours.</em></h2>
          <p>History, outdoors, food, shopping, arts—or a little bit of everything. Build a flexible itinerary around what you love.</p>
          <Link to="/plan-your-visit" className="button button-cream">Build my weekend <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <section className="home-final-cta page-container" data-reveal>
        <div><Eyebrow>WE'LL SAVE YOU A LITTLE ROOM</Eyebrow><h2>Columbia is ready<br />when <em>you are.</em></h2></div>
        <div className="final-cta-right"><p>Get oriented, pick your pace, and start with the places that make you curious.</p><Link to="/getting-here" className="button button-primary">Find your way here <ArrowUpRight size={16} /></Link></div>
      </section>
    </div>
  );
}
