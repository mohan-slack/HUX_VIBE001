import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { Checkout, OrderSuccess } from './pages/Checkout';
import { About, TrackOrder, Policies } from './pages/StaticPages';
import { ShopProvider } from './context/ShopContext';
import { CartDrawer } from './components/CartDrawer';
import { ConciergeAI } from './components/ConciergeAI';

function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="min-h-screen bg-hux-body text-hux-dark selection:bg-hux-accent selection:text-white font-sans">
          <Navbar />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success/:id" element={<OrderSuccess />} />
            <Route path="/about" element={<About />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/policies" element={<Policies />} />
          </Routes>
          <ConciergeAI />
          <Footer />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;