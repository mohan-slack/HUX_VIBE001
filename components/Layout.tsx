import React from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Instagram, Twitter, Facebook, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { FAQ_DATA } from '../constants';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { cart, setIsCartOpen } = useShop();
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 rounded-2xl glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-display font-bold tracking-tight text-hux-dark hover:text-hux-turquoise transition-colors">
          HUX
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide text-neutral-500 font-display uppercase">
          <Link to="/" className={`hover:text-hux-turquoise transition-colors ${location.pathname === '/' ? 'text-hux-turquoise' : ''}`}>Collection</Link>
          <a href="#ecosystem" className="hover:text-hux-turquoise transition-colors">Ecosystem</a>
          <Link to="/about" className="hover:text-hux-turquoise transition-colors">Vision</Link>
          <Link to="/track" className="hover:text-hux-turquoise transition-colors">Support</Link>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-hux-dark hover:text-hux-turquoise transition-colors"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-hux-turquoise to-hux-turquoiseLight text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-hux-dark">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 glass rounded-2xl p-6 flex flex-col gap-4 shadow-xl animate-slideUp">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-display font-medium text-hux-dark">Collection</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-display font-medium text-hux-dark">Vision</Link>
          <Link to="/track" onClick={() => setIsMenuOpen(false)} className="text-lg font-display font-medium text-hux-dark">Track Order</Link>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <footer className="mt-20 border-t border-white/50 bg-white/40 backdrop-blur-lg pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold text-hux-dark">HUX</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Intelligence Worn.<br/>
              The convergence of luxury and biometric technology.
            </p>
            <div className="flex gap-4 text-neutral-400">
               <Instagram size={20} className="hover:text-hux-turquoise cursor-pointer transition-colors" />
               <Twitter size={20} className="hover:text-hux-turquoise cursor-pointer transition-colors" />
               <Facebook size={20} className="hover:text-hux-turquoise cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-hux-dark font-bold font-display uppercase tracking-wider text-xs mb-6">Explore</h4>
            <ul className="space-y-3 text-neutral-500 text-sm">
              <li><Link to="/" className="hover:text-hux-turquoise transition-colors">Smart Ring</Link></li>
              <li><Link to="/about" className="hover:text-hux-turquoise transition-colors">Technology</Link></li>
              <li><Link to="/track" className="hover:text-hux-turquoise transition-colors">Order Status</Link></li>
            </ul>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-2">
            <h4 className="text-hux-dark font-bold font-display uppercase tracking-wider text-xs mb-6">Frequently Asked Questions</h4>
            <div className="space-y-2">
              {FAQ_DATA.map((faq, idx) => (
                <div key={idx} className="bg-white/50 border border-white/50 rounded-lg overflow-hidden transition-all">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center p-4 text-left hover:bg-white/80 transition-colors"
                  >
                    <span className="font-medium text-sm text-hux-dark">{faq.question}</span>
                    {openFaq === idx ? <ChevronUp size={16} className="text-hux-turquoise"/> : <ChevronDown size={16} className="text-neutral-400"/>}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="p-4 pt-0 text-sm text-neutral-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400 font-medium">
          <p>© 2024 HUX Technologies. Crafted with precision.</p>
          <div className="flex gap-6">
            <Link to="/policies" className="hover:text-hux-turquoise">Privacy</Link>
            <Link to="/policies" className="hover:text-hux-turquoise">Terms</Link>
            <Link to="/policies" className="hover:text-hux-turquoise">Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};