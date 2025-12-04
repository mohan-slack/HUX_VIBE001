import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Address } from '../types';
import { Button } from '../components/Button';
import { Check, CreditCard, ShieldCheck, ChevronLeft, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Checkout = () => {
  const { cart, placeOrder } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<Address>({
    fullName: '', street: '', city: '', state: '', zipCode: '', phone: '', email: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = 0; // Free
  const total = subtotal + shipping;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async () => {
    setLoading(true);
    const orderId = await placeOrder(address, paymentMethod);
    setLoading(false);
    navigate(`/success/${orderId}`);
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="min-h-screen pt-32 px-6 text-center bg-hux-ivory flex flex-col items-center justify-center">
        <h2 className="text-3xl font-display font-bold mb-4 text-hux-dark">Your Bag is Empty</h2>
        <p className="text-neutral-500 mb-8 max-w-md">Looks like you haven't added any smart rings to your collection yet.</p>
        <Link to="/"><Button variant="primary">Explore Collection</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-hux-ivory">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column - Forms */}
        <div className="animate-slideUp">
          {/* Steps Indicator */}
          <div className="flex items-center gap-4 mb-8 text-sm font-bold tracking-wide uppercase">
            <span className={`${step >= 1 ? 'text-hux-turquoise' : 'text-neutral-300'}`}>Shipping</span>
            <div className={`w-8 h-[2px] ${step >= 2 ? 'bg-hux-turquoise' : 'bg-neutral-200'}`}></div>
            <span className={`${step >= 2 ? 'text-hux-turquoise' : 'text-neutral-300'}`}>Payment</span>
          </div>

          {step === 1 && (
            <form onSubmit={handleAddressSubmit} className="glass p-8 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-display font-bold mb-8 text-hux-dark">Delivery Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase ml-2">Full Name</label>
                    <input required type="text" className="w-full bg-white/50 border border-neutral-200 p-4 rounded-xl focus:border-hux-turquoise focus:bg-white outline-none transition-all" 
                     value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 uppercase ml-2">Phone</label>
                    <input required type="text" className="w-full bg-white/50 border border-neutral-200 p-4 rounded-xl focus:border-hux-turquoise focus:bg-white outline-none transition-all" 
                     value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} />
                 </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-neutral-500 uppercase ml-2">Email</label>
                <input required type="email" className="w-full bg-white/50 border border-neutral-200 p-4 rounded-xl focus:border-hux-turquoise focus:bg-white outline-none transition-all" 
                     value={address.email} onChange={e => setAddress({...address, email: e.target.value})} />
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-neutral-500 uppercase ml-2">Street Address</label>
                <input required type="text" className="w-full bg-white/50 border border-neutral-200 p-4 rounded-xl focus:border-hux-turquoise focus:bg-white outline-none transition-all" 
                     value={address.street} onChange={e => setAddress({...address, street: e.target.value})} />
              </div>

              <div className="grid grid-cols-3 gap-6">
                 <input required type="text" placeholder="City" className="bg-white/50 border border-neutral-200 p-4 rounded-xl focus:border-hux-turquoise focus:bg-white outline-none transition-all" 
                   value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                 <input required type="text" placeholder="State" className="bg-white/50 border border-neutral-200 p-4 rounded-xl focus:border-hux-turquoise focus:bg-white outline-none transition-all" 
                   value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
                 <input required type="text" placeholder="Zip" className="bg-white/50 border border-neutral-200 p-4 rounded-xl focus:border-hux-turquoise focus:bg-white outline-none transition-all" 
                   value={address.zipCode} onChange={e => setAddress({...address, zipCode: e.target.value})} />
              </div>

              <Button type="submit" variant="primary" fullWidth className="mt-8">Proceed to Payment</Button>
            </form>
          )}

          {step === 2 && (
            <div className="glass p-8 rounded-3xl shadow-sm space-y-8">
              <button onClick={() => setStep(1)} className="flex items-center text-sm text-neutral-500 hover:text-hux-turquoise transition-colors mb-2">
                <ChevronLeft size={16} /> Back to Shipping
              </button>
              <h2 className="text-2xl font-display font-bold text-hux-dark">Secure Payment</h2>
              
              <div className="space-y-4">
                {[
                    { id: 'UPI', label: 'UPI / GPay / PhonePe', icon: <ShieldCheck size={20}/> },
                    { id: 'Card', label: 'Credit / Debit Card', icon: <CreditCard size={20}/> },
                    { id: 'COD', label: 'Cash on Delivery', icon: <Truck size={20}/> }
                ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-6 border rounded-2xl cursor-pointer flex items-center justify-between transition-all group ${paymentMethod === method.id ? 'border-hux-turquoise bg-blue-50/50' : 'border-neutral-200 bg-white/50 hover:border-hux-turquoise/50 hover:bg-white'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${paymentMethod === method.id ? 'bg-hux-turquoise text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                           {method.icon}
                        </div>
                        <span className="font-medium text-hux-dark">{method.label}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-hux-turquoise' : 'border-neutral-300'}`}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-hux-turquoise rounded-full"></div>}
                      </div>
                    </div>
                ))}
              </div>

              <div className="bg-green-50 p-4 rounded-xl text-sm text-green-800 border border-green-100 flex gap-2 items-center">
                <ShieldCheck size={18} />
                <span>All transactions are 256-bit SSL Encrypted.</span>
              </div>

              <Button onClick={handlePayment} variant="primary" fullWidth disabled={loading}>
                {loading ? 'Processing Securely...' : `Pay ₹${total.toLocaleString()}`}
              </Button>
            </div>
          )}
        </div>

        {/* Right Column - Summary */}
        <div className="h-fit sticky top-28 animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <div className="glass p-8 rounded-3xl border border-white/60">
            <h3 className="text-lg font-display font-bold mb-6 text-hux-dark border-b border-neutral-200 pb-4">Order Summary</h3>
            <div className="space-y-6">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-white rounded-xl relative flex items-center justify-center overflow-hidden border border-neutral-100 shadow-sm">
                       <div className="w-8 h-8 rounded-full border border-white shadow-md transform rotate-12" style={{backgroundColor: item.color === 'Tarnish Grey' ? '#6B7280' : item.color === 'Sterling Gold' ? '#EAB308' : '#FDA4AF'}}></div>
                    </div>
                    <div>
                      <p className="font-bold text-hux-dark text-sm">{item.product.name}</p>
                      <p className="text-xs text-neutral-500 mt-1">{item.color} | US {item.size} | x{item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-hux-turquoise text-sm">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-neutral-200 my-6 pt-6 space-y-3">
               <div className="flex justify-between text-neutral-500 text-sm">
                 <span>Subtotal</span>
                 <span>₹{subtotal.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-neutral-500 text-sm">
                 <span>Shipping</span>
                 <span className="text-hux-turquoise font-bold">Complimentary</span>
               </div>
            </div>

            <div className="flex justify-between text-xl font-bold border-t border-neutral-200 pt-6 text-hux-dark">
               <span>Total</span>
               <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderSuccess = () => {
  const navigate = useNavigate();
  const orderId = window.location.hash.split('/').pop();

  return (
    <div className="min-h-screen flex items-center justify-center bg-hux-ivory px-4">
      <div className="text-center max-w-md glass p-12 rounded-[2.5rem] shadow-xl border border-white">
        <div className="w-24 h-24 bg-gradient-to-br from-hux-turquoise to-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-hux-turquoise/30">
          <Check size={48} />
        </div>
        <h1 className="text-4xl font-display font-bold mb-4 text-hux-dark">Confirmed</h1>
        <p className="text-neutral-500 mb-2 font-medium">Your journey to better health begins now.</p>
        <p className="text-xs text-neutral-400 mb-8 uppercase tracking-widest">Order ID: <span className="font-mono text-hux-dark font-bold">{orderId}</span></p>
        <Button variant="primary" onClick={() => navigate('/')}>Return Home</Button>
      </div>
    </div>
  );
};