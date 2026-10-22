import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Clipboard, Compass, Printer, RotateCcw } from 'lucide-react';

const experiences = [
  { id: 'history', title: 'History', description: 'Stories, architecture & heritage', icon: '01' },
  { id: 'outdoors', title: 'Outdoors', description: 'River air & open spaces', icon: '02' },
  { id: 'food', title: 'Food & coffee', description: 'Local flavor & slow lunches', icon: '03' },
  { id: 'arts', title: 'Arts & culture', description: 'Galleries, makers & music', icon: '04' },
  { id: 'shopping', title: 'Shopping', description: 'Independent shops & finds', icon: '05' },
];

const plans = {
  history: [
    ['09:00 AM', 'Begin at the square', 'Walk around the Maury County courthouse and get a feel for historic downtown.'],
    ['10:30 AM', 'Go deeper at the Polk Home', 'Tour the President James K. Polk Home & Museum. Check official opening hours before you go.'],
    ['01:00 PM', 'Lunch downtown', 'Choose a local café or restaurant and let the morning discoveries set the conversation.'],
    ['02:30 PM', 'Follow the architecture', 'Slow down, look up, and explore the historic district’s layers of detail.'],
  ],
  outdoors: [
    ['08:30 AM', 'Coffee, then fresh air', 'Start with a coffee downtown before heading for open space.'],
    ['10:00 AM', 'Find the river', 'Explore the Duck River area and Riverwalk Park; check local conditions and park information.'],
    ['12:30 PM', 'A long lunch', 'Refuel close to downtown and take the scenic route between stops.'],
    ['03:00 PM', 'Keep the afternoon loose', 'Leave room for a local park, country drive, or another quiet spot you discover.'],
  ],
  food: [
    ['09:00 AM', 'A local coffee ritual', 'Begin with a freshly made coffee and a slow stroll around the square.'],
    ['10:30 AM', 'Browse between bites', 'Explore local shops and makers as you work up an appetite.'],
    ['12:30 PM', 'Make lunch the main event', 'Choose a locally owned restaurant in or near historic downtown.'],
    ['06:00 PM', 'Stay for dinner', 'Check the current dining and live-music options before choosing your evening.'],
  ],
  arts: [
    ['09:30 AM', 'Start on Main Street', 'Walk the square and see where local history meets the town’s present-day energy.'],
    ['11:00 AM', 'Explore the Arts District', 'Look for galleries, studios, and local creative spaces; confirm individual opening hours.'],
    ['01:00 PM', 'Break for lunch', 'Choose a downtown spot and compare notes on the things you’ve seen.'],
    ['03:00 PM', 'Leave room for a show', 'Check the official calendar for exhibitions, performances, and live music.'],
  ],
  shopping: [
    ['09:30 AM', 'Coffee before browsing', 'Fuel up and take a first loop around the historic square.'],
    ['10:30 AM', 'Find something unexpected', 'Browse independent storefronts, antiques, home goods, books, and local finds.'],
    ['01:00 PM', 'Pause for lunch', 'Turn your favorite discovery into your lunch conversation.'],
    ['02:30 PM', 'One more little detour', 'Revisit a shop, explore the Arts District, or keep wandering without a checklist.'],
  ],
};

function buildItems(selected) {
  const chosen = selected.length ? selected : ['history'];
  const map = {
    history: { title: 'Start with a story', detail: plans.history[0][2], time: 'MORNING' },
    outdoors: { title: 'Make room for the river', detail: plans.outdoors[1][2], time: 'LATE MORNING' },
    food: { title: 'Follow the local flavor', detail: plans.food[2][2], time: 'LUNCH' },
    arts: { title: 'Look for the creative corners', detail: plans.arts[1][2], time: 'AFTERNOON' },
    shopping: { title: 'Leave time to browse', detail: plans.shopping[1][2], time: 'AFTERNOON' },
  };
  return chosen.map((id) => ({ ...map[id], id }));
}

export default function PlanVisitPage() {
  const [selected, setSelected] = useState(['history', 'food']);
  const [day, setDay] = useState('weekend');
  const [pace, setPace] = useState('easy');
  const [people, setPeople] = useState('2');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const items = useMemo(() => buildItems(selected), [selected]);
  const toggle = (id) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const fullPlan = useMemo(() => {
    const lines = [`COLUMBIA, TENNESSEE — MY ${day === 'one-day' ? 'DAY TRIP' : day === 'weekend' ? 'WEEKEND' : 'SLOW WEEKEND'}`, `Pace: ${pace === 'easy' ? 'Unhurried' : pace === 'balanced' ? 'A little of everything' : 'Full day'}, visitors: ${people}`, '', ...items.map((item, i) => `${String(i + 1).padStart(2, '0')} · ${item.time} — ${item.title}\n${item.detail}`), '', 'Check current opening hours, event dates, and weather before setting out.'];
    return lines.join('\n');
  }, [day, pace, people, items]);

  const copyPlan = async () => {
    try {
      await navigator.clipboard.writeText(fullPlan);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt('Copy your itinerary below:', fullPlan);
    }
  };

  return (
    <div className="plan-page page-pad">
      <section className="plan-intro page-intro-compact">
        <div className="eyebrow"><span />THE WAY YOU WANT TO WANDER</div>
        <h1>Your time.<br /><em>Your kind of town.</em></h1>
        <p>A good trip needs a little direction and plenty of room for surprises. Choose what you love; we’ll help you sketch the rest.</p>
        <div className="planner-intro-meta"><span><Compass size={14} /> A PERSONAL STARTING POINT</span><span><CalendarDays size={14} /> FLEXIBLE BY DESIGN</span></div>
      </section>

      <div className="planner-layout">
        <section className="planner-form-panel">
          <div className="planner-form-top"><span>BUILD YOUR VISIT</span><span>01 — 03</span></div>
          <div className="planner-form-section"><h2>What are you<br /><em>in the mood for?</em></h2><p>Choose one or more interests.</p>
            <div className="interest-grid">{experiences.map((experience) => {
              const active = selected.includes(experience.id);
              return <button key={experience.id} type="button" className={`interest-card${active ? ' interest-card-active' : ''}`} aria-pressed={active} onClick={() => toggle(experience.id)}><span className="interest-card-top"><span>{experience.icon}</span>{active && <Check size={15} />}</span><strong>{experience.title}</strong><small>{experience.description}</small></button>;
            })}</div>
          </div>
          <div className="planner-form-section planner-preferences"><h3>A few details</h3>
            <label className="field-label" htmlFor="trip-length">How long are you here?</label>
            <div className="select-options" role="group" aria-label="Trip length">{[{ id: 'one-day', label: 'A day' }, { id: 'weekend', label: 'A weekend' }, { id: 'slow', label: 'A slow few days' }].map((option) => <button key={option.id} type="button" onClick={() => setDay(option.id)} className={day === option.id ? 'select-option-active' : ''} aria-pressed={day === option.id}>{option.label}</button>)}</div>
            <label className="field-label" htmlFor="pace">Your pace</label><select id="pace" value={pace} onChange={(event) => setPace(event.target.value)}><option value="easy">Unhurried — no rush</option><option value="balanced">A little of everything</option><option value="full">Make a full day of it</option></select>
            <label className="field-label" htmlFor="people">Who’s coming?</label><select id="people" value={people} onChange={(event) => setPeople(event.target.value)}><option value="1">Just me</option><option value="2">Two of us</option><option value="3–4">3–4 people</option><option value="5+">5 or more</option></select>
            <button type="button" className="button button-dark planner-generate" onClick={() => { setGenerated(true); document.getElementById('generated-itinerary')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>Build my itinerary <ArrowUpRight size={16} /></button>
            <p className="planner-disclaimer">A flexible idea, not a reservation. Check hours and availability with each destination.</p>
          </div>
        </section>

        <section className="itinerary-panel" id="generated-itinerary">
          <div className="itinerary-panel-top"><span>YOUR COLUMBIA EDIT</span><span className="itinerary-status"><i /> {generated ? 'YOUR PLAN IS READY' : 'READY WHEN YOU ARE'}</span></div>
          <div className="itinerary-heading"><p className="feature-card-type">{generated ? 'BUILT AROUND YOUR INTERESTS' : 'A LITTLE INSPIRATION'}</p><h2>{generated ? <>Let the day<br /><em>unfold.</em></> : <>A good day<br /><em>starts here.</em></>}</h2><p>{generated ? `A ${day === 'one-day' ? 'day trip' : day === 'weekend' ? 'weekend' : 'slower few days'} for ${people === '1' ? 'one curious traveler' : people === '2' ? 'two curious travelers' : `${people} curious travelers`}, with a ${pace === 'easy' ? 'relaxed' : pace === 'balanced' ? 'balanced' : 'full'} pace.` : 'Here’s a small taste of the Columbia rhythm. Pick a few interests to make it yours.'}</p></div>
          <div className="itinerary-list">{(generated ? items : [{ id: 'inspire-1', time: 'MORNING', title: 'Start where the stories live', detail: 'Take your first lap around the historic square, then follow whichever storefront catches your eye.' }, { id: 'inspire-2', time: 'AFTERNOON', title: 'Leave room for a detour', detail: 'Add a museum, a gallery, or a little time by the river to round out the day.' }]).map((item, index) => <motion.article key={item.id} className="itinerary-item" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}><div className="itinerary-time"><span>{String(index + 1).padStart(2, '0')}</span>{item.time}</div><div className="itinerary-item-copy"><h3>{item.title}</h3><p>{item.detail}</p></div><ArrowRight size={16} /></motion.article>)}</div>
          <div className="itinerary-actions"><button type="button" onClick={copyPlan} className="itinerary-action">{copied ? <Check size={15} /> : <Clipboard size={15} />}{copied ? 'Copied to clipboard' : 'Copy plan'}</button><button type="button" className="itinerary-action" onClick={() => window.print()}><Printer size={15} /> Print / save PDF</button><button type="button" className="itinerary-action" onClick={() => { setGenerated(false); setSelected(['history', 'food']); setDay('weekend'); setPace('easy'); setPeople('2'); }}><RotateCcw size={15} /> Reset</button></div>
        </section>
      </div>

      <section className="planner-help"><div><div className="eyebrow"><span />NEED A LOCAL POINTER?</div><h2>Start with a local.</h2><p>The Columbia Welcome Center can help with visitor guides, local information, and current happenings.</p></div><div className="planner-help-actions"><a href="tel:+19315601506" className="button button-dark">Call 931 560 1506 <ArrowUpRight size={16} /></a><Link to="/getting-here" className="underlined-link">Find the Welcome Center <ArrowUpRight size={15} /></Link></div></section>
    </div>
  );
}
