import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function NotFoundPage() {
  return <section className="not-found-page page-pad"><div className="eyebrow"><span />OFF THE MAP, NOT OUT OF OPTIONS</div><p className="not-found-number">404</p><h1>This page took<br /><em>a little detour.</em></h1><p className="not-found-copy">The address may have changed, but there’s plenty more to discover around here.</p><div className="not-found-actions"><Link to="/" className="button button-dark"><ArrowLeft size={16} /> Back home</Link><Link to="/attractions" className="underlined-link">Find something to explore <ArrowUpRight size={15} /></Link></div></section>;
}
