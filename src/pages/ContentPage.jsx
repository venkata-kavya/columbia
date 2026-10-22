import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, MapPin, Plus, Minus } from 'lucide-react';

const photos = {
  architecture: '/images/downtown-editorial.jpg',
  home: '/images/heritage-home.jpg',
  nature: '/images/duck-river.jpg',
  water: '/images/duck-river.jpg',
  art: '/images/first-fridays-editorial.jpg',
  streets: '/images/downtown-editorial.jpg',
};

const PAGES = {
  about: {
    eyebrow: 'THE TOWN', title: <>Meet your new<br /><em>favorite detour.</em></>, intro: 'Just south of Nashville, Columbia pairs the warmth of a classic Southern town with an independent spirit all its own.', image: photos.architecture, imageAlt: 'Architectural details and old-world town character', imageLabel: 'A MAIN STREET STATE OF MIND',
    bodyTitle: <>The kind of place<br />that <em>stays with you.</em></>, body: 'Columbia is the kind of town best discovered at walking pace. Start at the courthouse square, follow your curiosity into local shops and galleries, and leave a little space in the day for the Duck River. There is history here, but it is not stuck in the past.',
    stats: [{ value: '1807', label: 'CHARTERED AS A TOWN' }, { value: '01', label: 'HISTORIC DOWNTOWN DISTRICT' }, { value: '∞', label: 'LOCAL WAYS TO WANDER' }],
    links: [{ title: 'Explore the historic square', to: '/historic-square', image: photos.streets, label: 'THE HEART OF TOWN' }, { title: 'Get outside', to: '/attractions', image: photos.nature, label: 'FRESH AIR, CLOSE BY' }], ctaTitle: <>Make a little room<br />for <em>Columbia.</em></>, cta: 'Plan your visit', ctaTo: '/plan-your-visit',
  },
  heritage: {
    eyebrow: 'HISTORY & HERITAGE', title: <>Old roots.<br /><em>New chapters.</em></>, intro: 'A town shaped by generations, preserved architecture, presidential history, and the stories that keep getting told.', image: photos.home, imageAlt: 'A welcoming historic-style home framed by greenery', imageLabel: 'HISTORY IS PART OF THE LANDSCAPE',
    bodyTitle: <>Past is present.<br /><em>Always.</em></>, body: 'Columbia was chartered in 1807 and its commercial historic district is recognized for layers of Federal, Victorian, and mid-19th-century Revival architecture. The past is not just behind glass: it is woven through the square, the neighborhoods, the museum doors, and the stories locals share.',
    stats: [{ value: '1807', label: 'TOWN CHARTERED' }, { value: '1840s', label: 'POLK HOME ROOTS' }, { value: '3', label: 'ARCHITECTURAL ERAS & MORE' }],
    links: [{ title: 'President James K. Polk Home & Museum', to: 'https://jameskpolk.com/visit/', external: true, image: photos.home, label: 'A PRESIDENTIAL STORY' }, { title: 'The streets that tell it', to: '/historic-square', image: photos.architecture, label: 'HISTORIC DOWNTOWN' }], ctaTitle: <>Take the story<br /><em>one stop further.</em></>, cta: 'Explore the town', ctaTo: '/attractions',
  },
  square: {
    eyebrow: 'HISTORIC DOWNTOWN', title: <>Meet me<br /><em>on the square.</em></>, intro: 'Independent shops, inviting places to eat, a landmark courthouse, and a downtown made for taking the long way around.', image: photos.architecture, imageAlt: 'Classic town architecture', imageLabel: 'THE HEART OF COLUMBIA',
    bodyTitle: <>A few blocks.<br /><em>A full afternoon.</em></>, body: 'The historic commercial district is the kind of downtown where a coffee turns into a browse, a browse turns into lunch, and the next storefront always earns a look. Find antiques, local makers, art, live music, and the easy rhythm of Main Street.',
    stats: [{ value: 'WALK', label: 'YOUR OWN LITTLE LOOP' }, { value: 'SHOP', label: 'INDEPENDENT FINDS' }, { value: 'STAY', label: 'FOR THE EVENING' }],
    links: [{ title: 'Find the local favorites', to: 'https://www.visitcolumbiatn.com/explore/shopping/historic-downtown/', external: true, image: photos.streets, label: 'SHOP, STROLL, REPEAT' }, { title: 'Explore the arts district', to: '/attractions', image: photos.art, label: 'A CREATIVE STREAK' }], ctaTitle: <>Come for a look.<br /><em>Stay for a while.</em></>, cta: 'Build a downtown day', ctaTo: '/plan-your-visit',
  },
  attractions: {
    eyebrow: 'THINGS TO DO', title: <>A little of<br /><em>everything.</em></>, intro: 'Presidential history, a lively downtown, working artists, live music, and natural spaces worth the extra hour.', image: photos.nature, imageAlt: 'Open scenery and calm water', imageLabel: 'THE TOWN IS ONLY THE BEGINNING',
    bodyTitle: <>Pick a direction.<br /><em>See where it goes.</em></>, body: 'Make a history morning of it, find your next favorite shop, take in a show, or get outside near the Duck River. Columbia is compact enough to explore without a complicated plan—and full of reasons to make a second one.',
    stats: [{ value: 'SEE', label: 'LANDMARKS & MUSEUMS' }, { value: 'MAKE', label: 'ARTS & LOCAL CULTURE' }, { value: 'ROAM', label: 'RIVER & OUTDOORS' }],
    links: [{ title: 'President James K. Polk Home & Museum', to: 'https://jameskpolk.com/visit/', external: true, image: photos.home, label: 'HISTORY' }, { title: 'Duck River & Riverwalk Park', to: 'https://www.columbiatn.gov/', external: true, image: photos.water, label: 'OUTDOORS' }, { title: 'Columbia Arts District', to: 'https://www.visitcolumbiatn.com/explore/attractions/', external: true, image: photos.art, label: 'CREATIVITY' }], ctaTitle: <>Make a plan.<br /><em>Leave room to roam.</em></>, cta: 'Build your itinerary', ctaTo: '/plan-your-visit',
  },
  events: {
    eyebrow: 'CALENDAR & COMMUNITY', title: <>Good things<br /><em>happen here.</em></>, intro: 'From the signature Mule Day celebration to monthly downtown nights, Columbia knows how to bring people together.', image: photos.art, imageAlt: 'A cultural event space with lights and atmosphere', imageLabel: 'MAKE YOUR VISIT A LITTLE LIVELIER',
    bodyTitle: <>A calendar with<br /><em>character.</em></>, body: 'Some events are worth planning a trip around; others turn an ordinary Friday into the best part of the week. First Fridays brings extra energy downtown, while Mule Day is Columbia’s signature annual celebration. Dates and details change, so check the official event calendar before you travel.',
    stats: [{ value: 'SPRING', label: 'MULE DAY SEASON' }, { value: 'MONTHLY', label: 'FIRST FRIDAYS' }, { value: 'YEAR-ROUND', label: 'LOCAL HAPPENINGS' }],
    links: [{ title: 'See what’s coming up', to: 'https://www.visitcolumbiatn.com/', external: true, image: photos.art, label: 'OFFICIAL EVENT CALENDAR' }, { title: 'Make a weekend of it', to: '/plan-your-visit', image: photos.streets, label: 'TURN AN EVENT INTO A TRIP' }], ctaTitle: <>Pick your date.<br /><em>We’ll set the scene.</em></>, cta: 'Plan around your interests', ctaTo: '/plan-your-visit',
  },
  gettingHere: {
    eyebrow: 'GETTING HERE', title: <>Easy to reach.<br /><em>Hard to rush.</em></>, intro: 'Make your way to Columbia, Tennessee, settle into the historic downtown, and let the town set the pace.', image: photos.nature, imageAlt: 'A scenic road through green countryside', imageLabel: 'YOUR DETOUR STARTS HERE',
    bodyTitle: <>The directions are<br /><em>the easy part.</em></>, body: 'Columbia sits in Middle Tennessee, south of Nashville, with a walkable historic downtown at the center of the experience. For a visitor-friendly first stop, head to the Columbia Welcome Center on North Main Street to pick up local guides and get oriented.',
    stats: [{ value: '713', label: 'N. MAIN STREET WELCOME CENTER' }, { value: '931', label: '560 · 1506' }, { value: 'MAP', label: 'OPEN DIRECTIONS BELOW' }],
    links: [{ title: 'Directions to the Welcome Center', to: 'https://maps.google.com/?q=713+N+Main+Street+Columbia+TN+38401', external: true, image: photos.streets, label: '713 N. MAIN STREET' }, { title: 'Plan your first day', to: '/plan-your-visit', image: photos.architecture, label: 'START WITH THE SQUARE' }], ctaTitle: <>Get here.<br /><em>Take your time.</em></>, cta: 'Plan a visit', ctaTo: '/plan-your-visit',
  },
  privacy: {
    eyebrow: 'THE FINE PRINT', title: <>Your information.<br /><em>Your business.</em></>, intro: 'A plain-language overview of privacy on this visitor guide experience.', image: photos.streets, imageAlt: 'A quiet street at dusk', imageLabel: 'CLEAR, SIMPLE, RESPECTFUL',
    bodyTitle: <>How this guide<br /><em>handles information.</em></>, body: 'This front-end visitor guide does not include a server-side account system or analytics form. Planner selections stay in your browser unless you choose to copy or print them. Links to third-party services are governed by those services’ own privacy policies. Contact links open your email application rather than silently sending information.',
    stats: [{ value: 'LOCAL', label: 'PLANNER STATE' }, { value: 'NO', label: 'ACCOUNT REQUIRED' }, { value: 'YOU', label: 'CHOOSE WHAT TO SHARE' }],
    links: [{ title: 'Questions about your visit?', to: '/support', image: photos.architecture, label: 'CONTACT' }, { title: 'Official tourism website', to: 'https://www.visitcolumbiatn.com/privacy-policy/', external: true, image: photos.streets, label: 'OFFICIAL SITE PRIVACY' }], ctaTitle: <>Questions are<br /><em>always welcome.</em></>, cta: 'Contact support', ctaTo: '/support',
  },
};

const faqs = [
  { q: 'What is Columbia, Tennessee known for?', a: 'Columbia is known for its historic downtown and courthouse square, the President James K. Polk Home & Museum, a growing arts scene, signature events such as Mule Day, and access to the Duck River.' },
  { q: 'Where should I start on my first visit?', a: 'Start at the Columbia Welcome Center at 713 N. Main Street, then walk around the historic square. Add the Polk Home & Museum or the Columbia Arts District, and leave a little time for Riverwalk Park.' },
  { q: 'Can I explore downtown on foot?', a: 'The historic downtown square is compact and is well suited to exploring on foot. Wear comfortable shoes and check opening times for individual businesses and attractions.' },
  { q: 'When is Mule Day?', a: 'Mule Day is Columbia’s signature annual celebration, generally associated with spring. Event schedules can change, so check the official Visit Columbia website before making travel plans.' },
  { q: 'How can I get help planning my trip?', a: 'Visit the Columbia Welcome Center at 713 N. Main Street or call 931-560-1506. You can also use this site’s itinerary planner to create a starting point for your day.' },
];

function Eyebrow({ children }) { return <div className="eyebrow"><span />{children}</div>; }
function CardLink({ item, index }) {
  const Inner = <><div className="related-image"><img loading="lazy" src={item.image} alt="" /><span>{String(index + 1).padStart(2, '0')}</span><i><ArrowUpRight size={17} /></i></div><div className="related-card-copy"><span className="feature-card-type">{item.label}</span><h3>{item.title}</h3><div className="related-link-text">Explore <ArrowUpRight size={14} /></div></div></>;
  return item.external ? <a className="related-card" href={item.to} target="_blank" rel="noreferrer">{Inner}</a> : <Link className="related-card" to={item.to}>{Inner}</Link>;
}

function FAQList() {
  const [active, setActive] = useState(0);
  return <div className="faq-list">{faqs.map((faq, index) => <article className={`faq-item${active === index ? ' faq-item-open' : ''}`} key={faq.q}><button className="faq-question" onClick={() => setActive(active === index ? -1 : index)} aria-expanded={active === index}><span className="faq-number">0{index + 1}</span><span>{faq.q}</span>{active === index ? <Minus size={17} /> : <Plus size={17} />}</button>{active === index && <motion.p className="faq-answer" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>{faq.a}</motion.p>}</article>)}</div>;
}

function FAQPage() {
  return <div className="simple-page page-pad"><div className="page-intro page-intro-compact"><Eyebrow>GOOD TO KNOW</Eyebrow><h1>A few things<br /><em>you might wonder.</em></h1><p>Quick answers to help you make the most of your time in Columbia.</p></div><div className="faq-page-layout"><div><p className="feature-card-type">THE VISITOR FAQ</p><h2>Helpful before<br /><em>you head out.</em></h2><p className="muted-copy">For up-to-date hours and event details, check with the individual destination or the official tourism team.</p><Link to="/support" className="underlined-link">Still have a question? <ArrowUpRight size={15} /></Link></div><FAQList /></div></div>;
}

export default function ContentPage({ page }) {
  if (page === 'faq') return <FAQPage />;
  const data = PAGES[page] || PAGES.about;
  return (
    <div className="content-page page-pad">
      <section className="inner-page-hero">
        <div className="page-intro">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
          <div className="page-intro-actions"><Link className="button button-dark" to={data.ctaTo || '/plan-your-visit'}>{data.cta || 'Plan your visit'} <ArrowUpRight size={16} /></Link><span className="page-count">COLUMBIA, TENNESSEE <span>·</span> 01—04</span></div>
        </div>
        <motion.div className="inner-page-image" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}>
          <img src={data.image} alt={data.imageAlt} />
          <span>{data.imageLabel}</span>
          <i><ArrowUpRight size={19} /></i>
        </motion.div>
      </section>

      <section className="page-story-section">
        <div className="page-story-heading"><Eyebrow>THE DETAILS</Eyebrow><h2>{data.bodyTitle}</h2></div>
        <div className="page-story-copy"><p>{data.body}</p><Link className="underlined-link" to="/getting-here">Start with the essentials <ArrowUpRight size={15} /></Link></div>
      </section>

      <section className="page-stat-row">{data.stats.map((stat) => <div className="page-stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</section>

      {page === 'events' && <section className="event-note"><div className="event-note-icon"><CalendarDays size={22} /></div><div><p className="feature-card-type">PLAN AROUND THE CALENDAR</p><h2>Make the date part of the story.</h2><p>Event dates, tickets, and schedules can change. Visit the official tourism calendar before booking travel.</p></div><a href="https://www.visitcolumbiatn.com/" target="_blank" rel="noreferrer" className="round-arrow" aria-label="Visit official tourism calendar"><ArrowUpRight size={18} /></a></section>}
      {page === 'gettingHere' && <section className="directions-panel"><div><MapPin size={19} /><div><p className="feature-card-type">COLUMBIA WELCOME CENTER</p><h3>713 N. Main Street, Columbia, TN 38401</h3><p>Call 931-560-1506 for visitor information.</p></div></div><a className="button button-dark" target="_blank" rel="noreferrer" href="https://maps.google.com/?q=713+N+Main+Street+Columbia+TN+38401">Get directions <ArrowUpRight size={15} /></a></section>}

      <section className="related-section">
        <div className="related-heading"><div><Eyebrow>KEEP EXPLORING</Eyebrow><h2>Follow your<br /><em>curiosity.</em></h2></div><Link className="underlined-link" to="/attractions">See everything <ArrowUpRight size={15} /></Link></div>
        <div className="related-grid">{data.links.map((item, index) => <CardLink key={item.title} item={item} index={index} />)}</div>
      </section>

      <section className="page-end-cta"><div><Eyebrow>YOUR COLUMBIA STORY STARTS HERE</Eyebrow><h2>{data.ctaTitle}</h2></div><Link to={data.ctaTo || '/plan-your-visit'} className="button button-light">{data.cta || 'Plan your visit'} <ArrowUpRight size={16} /></Link></section>
    </div>
  );
}
