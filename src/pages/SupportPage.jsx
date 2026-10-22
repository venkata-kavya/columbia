import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Mail, MapPin, Phone } from 'lucide-react';

export default function SupportPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'Trip planning', message: '' });
  const [attempted, setAttempted] = useState(false);
  const [ready, setReady] = useState(false);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    setAttempted(true);
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    const subject = encodeURIComponent(`Columbia TN visitor question: ${form.topic}`);
    const body = encodeURIComponent(`Name: ${form.name}\nReply email: ${form.email}\nTopic: ${form.topic}\n\n${form.message}`);
    setReady(true);
    window.location.href = `mailto:kmurphy@columbiatn.gov?subject=${subject}&body=${body}`;
  };

  return (
    <div className="support-page page-pad">
      <section className="support-intro page-intro-compact"><div className="eyebrow"><span />A REAL PERSON, A GOOD PLACE TO START</div><h1>Need a hand?<br /><em>We’re listening.</em></h1><p>Whether you’re putting a weekend together or looking for a local detail, start here. We’ll point you in the right direction.</p></section>
      <div className="support-layout">
        <aside className="support-sidebar">
          <p className="feature-card-type">VISITOR WELCOME CENTER</p><h2>Local insight.<br /><em>Warm welcome.</em></h2><p className="muted-copy">The official Columbia tourism team can help you get oriented and make the most of your visit.</p>
          <a className="contact-method" href="tel:+19315601506"><span><Phone size={18} /></span><div><small>GIVE US A CALL</small><strong>931 560 1506</strong></div><ArrowUpRight size={15} /></a>
          <a className="contact-method" href="mailto:kmurphy@columbiatn.gov"><span><Mail size={18} /></span><div><small>SEND AN EMAIL</small><strong>Contact tourism</strong></div><ArrowUpRight size={15} /></a>
          <a className="contact-method" target="_blank" rel="noreferrer" href="https://maps.google.com/?q=713+N+Main+Street+Columbia+TN+38401"><span><MapPin size={18} /></span><div><small>COME SAY HELLO</small><strong>713 N. Main Street</strong></div><ArrowUpRight size={15} /></a>
          <div className="support-hours"><span>VISITOR CENTER HOURS</span><p>Mon–Fri · 10 AM–4 PM<br />Saturday · 10 AM–3 PM<br />Sunday · 12 PM–3 PM</p><small>Hours can change on holidays; confirm before visiting.</small></div>
        </aside>
        <section className="contact-form-panel">
          <div className="contact-form-heading"><span>LET’S TALK COLUMBIA</span><span>01 / CONTACT</span></div>
          {ready ? <div className="form-success"><span><Check size={22} /></span><h2>Your message is ready.</h2><p>Your email app should open with your details filled in. If it didn’t, contact the tourism team directly using the links to the left.</p><button type="button" className="underlined-link" onClick={() => setReady(false)}>Edit your message <ArrowUpRight size={14} /></button></div> : <form onSubmit={submit} noValidate>
            <div className="form-field-grid"><label className="form-field"><span>Your name</span><input name="name" value={form.name} onChange={update} placeholder="How should we address you?" />{attempted && !form.name.trim() && <small className="field-error">Please enter your name.</small>}</label><label className="form-field"><span>Email address</span><input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" />{attempted && !form.email.trim() && <small className="field-error">Please enter your email.</small>}</label></div>
            <label className="form-field"><span>What can we help with?</span><select name="topic" value={form.topic} onChange={update}><option>Trip planning</option><option>Events & happenings</option><option>Accessibility</option><option>Group travel</option><option>Something else</option></select></label>
            <label className="form-field"><span>Your message</span><textarea name="message" rows="5" value={form.message} onChange={update} placeholder="Tell us a little about what you’re planning…" />{attempted && !form.message.trim() && <small className="field-error">Please add a message.</small>}</label>
            <div className="form-submit-row"><p>This form opens your email app. Your message is not sent or stored by this website.</p><button type="submit" className="button button-dark">Prepare message <ArrowUpRight size={16} /></button></div>
          </form>}
        </section>
      </div>
      <div className="support-bottom-note"><span>MORE TO EXPLORE</span><Link to="/faq">Visitor FAQs <ArrowUpRight size={14} /></Link><Link to="/getting-here">Getting here <ArrowUpRight size={14} /></Link><Link to="/plan-your-visit">Plan your visit <ArrowUpRight size={14} /></Link></div>
    </div>
  );
}
