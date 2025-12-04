import React, { useState } from 'react';
import { Button } from '../components/Button';

export const About = () => (
  <div className="min-h-screen pt-32 px-6 bg-hux-body">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-display font-bold mb-8 text-hux-dark">About HUX.</h1>
      <p className="text-xl text-neutral-600 leading-relaxed mb-12 font-light">
        We believe health technology shouldn't look like a gadget. It should be seamless, invisible, and beautiful. 
        HUX is the convergence of fine jewelry, titanium engineering, and artificial intelligence.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-neutral-100">
          <h3 className="text-2xl font-bold mb-4 font-display text-hux-dark">Our Mission</h3>
          <p className="text-neutral-600">To empower individuals with actionable health data without compromising on personal style.</p>
        </div>
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-neutral-100">
          <h3 className="text-2xl font-bold mb-4 font-display text-hux-dark">Craftsmanship</h3>
          <p className="text-neutral-600">Forged from aerospace titanium grade 5, coated with liquid glass for scratch resistance and a premium frosted finish.</p>
        </div>
      </div>
    </div>
  </div>
);

export const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<null | string>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) setStatus('Processing - Estimated Delivery: 3 Days');
  };

  return (
    <div className="min-h-screen pt-32 px-6 bg-hux-body flex flex-col items-center">
      <h1 className="text-4xl font-display font-bold mb-8 text-hux-dark">Track Your HUX</h1>
      <form onSubmit={handleTrack} className="w-full max-w-md space-y-4">
        <input 
          type="text" 
          placeholder="Enter Order ID (e.g. HUX-12345)" 
          className="w-full bg-white border border-neutral-200 p-4 rounded-lg focus:border-hux-accent outline-none text-hux-dark placeholder:text-neutral-400"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button variant="primary" fullWidth type="submit">Track Status</Button>
      </form>
      {status && (
        <div className="mt-8 p-6 bg-white border border-neutral-200 rounded-xl w-full max-w-md text-center shadow-lg">
           <p className="text-hux-accent font-bold font-display">{status}</p>
        </div>
      )}
    </div>
  );
};

export const Policies = () => (
  <div className="min-h-screen pt-32 px-6 bg-hux-body pb-20">
    <div className="max-w-3xl mx-auto space-y-12 bg-white p-12 rounded-3xl shadow-sm border border-neutral-100">
      <section>
        <h1 className="text-4xl font-display font-bold mb-8 text-hux-dark">Support & Policies</h1>
        <h2 className="text-2xl font-bold mb-4 text-hux-accent font-display">Warranty</h2>
        <p className="text-neutral-600 leading-relaxed">HUX Smart Ring Silver Frost Edition comes with a 1-year limited warranty covering manufacturing defects. This does not cover normal wear and tear or accidental damage.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4 text-hux-accent font-display">Returns</h2>
        <p className="text-neutral-600 leading-relaxed">We offer a 30-day return policy for sizing exchanges or refunds. The ring must be in original condition with all accessories and the box.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4 text-hux-accent font-display">Data Privacy</h2>
        <p className="text-neutral-600 leading-relaxed">Your health data is encrypted and stored locally on your device. HUX is fully GDPR compliant.</p>
      </section>
    </div>
  </div>
);