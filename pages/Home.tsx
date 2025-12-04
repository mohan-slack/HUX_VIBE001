import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Plus, Play, Moon, Activity, Zap, Star, ArrowRight, Heart, Brain, Box, Rotate3d, Move, Fingerprint, ShieldAlert, Wind, Bell, TrendingUp, Cpu, Battery, Wifi, Droplets, PackageOpen } from 'lucide-react';
import { Button } from '../components/Button';
import { useShop } from '../context/ShopContext';
import { HUX_PRODUCT } from '../constants';
import { ProductColor, RingSize } from '../types';
import { MasonryGrid } from '../components/MasonryGrid';

export const Home = () => {
  const { addToCart } = useShop();

  // --- HERO SLIDER STATE ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Intelligence Worn.",
      subtitle: "The Future of Wellness",
      desc: "Precision sensors meet aerospace titanium.",
      bgImage: "https://images.unsplash.com/photo-1617038224721-f76f060fddd5?q=80&w=3132&auto=format&fit=crop",
      accent: "text-white"
    },
    {
      title: "Sleep Mastered.",
      subtitle: "Wake Up Ready",
      desc: "Clinical-grade sleep staging in your sleep.",
      bgImage: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2940&auto=format&fit=crop",
      accent: "text-hux-ivory"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // --- RING CARD EXPANSION STATE ---
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // --- ECOSYSTEM ACCORDION STATE ---
  const [activeTab, setActiveTab] = useState(0);
  const ecosystemItems = [
    { title: "Sleep", desc: "Understand your sleep cycles with clinical precision.", icon: Moon, image: "https://images.unsplash.com/photo-1541781777631-faaf537cdd92?auto=format&fit=crop&q=80&w=1000" },
    { title: "Activity", desc: "Track movement, steps, and caloric burn effortlessly.", icon: Activity, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1000" },
    { title: "Recovery", desc: "Know exactly when to push and when to rest.", icon: Zap, image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000" }
  ];

  // --- GALLERY STATE ---
  const [activeGallery, setActiveGallery] = useState(0);

  // --- 360 VIEW STATE ---
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const rotateRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setStartX(clientX - rotation);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setRotation(clientX - startX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // --- MASONRY GRID COLUMNS ---
  const [columns, setColumns] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const featuresList = [
    { 
      title: "Gesture Control", 
      desc: "Navigate your digital world with subtle finger taps.", 
      icon: Fingerprint, 
      border: "border-cyan-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-holographic-screen-32724-large.mp4" 
    },
    { 
      title: "SOS Alert", 
      desc: "Triple-tap to instantly alert contacts with GPS location.", 
      icon: ShieldAlert, 
      border: "border-red-500",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-dialing-emergency-number-on-smartphone-4262-large.mp4"
    },
    { 
      title: "Heart & HRV", 
      desc: "Clinical-grade monitoring during every run and rest.", 
      icon: Heart, 
      border: "border-rose-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-running-during-sunset-1711-large.mp4"
    },
    { 
      title: "Stress Detection", 
      desc: "Real-time autonomic nervous system analysis.", 
      icon: Activity, 
      border: "border-orange-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-practicing-meditation-at-home-44670-large.mp4"
    },
    { 
      title: "AI Insights", 
      desc: "Predictive wellness that adapts to your daily lifestyle.", 
      icon: Brain, 
      border: "border-violet-500",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-motherboard-circuit-texture-loop-3221-large.mp4"
    },
    { 
      title: "Mindful Balance", 
      desc: "Dedicated Yoga modes to center your mind and body.", 
      icon: Wind, 
      border: "border-emerald-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-practicing-yoga-pose-on-the-beach-4061-large.mp4"
    },
    { 
      title: "Vibration Alerts", 
      desc: "Discrete haptic notifications. Wake up silently.", 
      icon: Bell, 
      border: "border-amber-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-sleeping-in-bed-4258-large.mp4"
    },
    { 
      title: "Performance Mode", 
      desc: "Push your limits. Analyze workouts with precision data.", 
      icon: TrendingUp, 
      border: "border-hux-turquoise",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-doing-crossfit-exercises-with-a-kettlebell-280-large.mp4"
    },
  ];

  const huxTestimonials = [
    {
      name: 'Elena K.',
      role: 'Yoga Instructor',
      feedback: "HUX captures my recovery data without interrupting my flow. It's invisible tech.",
      image: "https://images.unsplash.com/photo-1544367563-12123d8959f9?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: 'Marcus Thorne',
      role: 'Crossfit Athlete',
      feedback: "The durability is unmatched. Titanium that actually survives the gym.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: 'Sarah Jenkins',
      role: 'Creative Director',
      feedback: "Finally, a wearable that matches my evening wear. The gold finish is exquisite.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: 'Dr. Aris V.',
      role: 'Sleep Specialist',
      feedback: "The sleep staging accuracy rivals clinical polysomnography equipment.",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg"
    },
    {
      name: 'James Chen',
      role: 'Architect',
      feedback: "Minimalism at its finest. Data when I want it, silence when I need it.",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/men/86.jpg"
    },
    {
      name: 'Priya Patel',
      role: 'Marathon Runner',
      feedback: "Lightweight and precise. I forget I'm wearing it until I check my stats.",
      image: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-hux-ivory overflow-x-hidden selection:bg-hux-turquoise selection:text-white"
         onMouseUp={handleMouseUp}
         onTouchEnd={handleMouseUp}>
      
      {/* 1. HERO SECTION - ADVANCED SLIDER */}
      <section className="relative h-screen w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
             {/* Background with Parallax */}
             <div 
               className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[10000ms] ease-linear"
               style={{ 
                 backgroundImage: `url(${slide.bgImage})`,
                 transform: index === currentSlide ? 'scale(110)' : 'scale(100)'
               }}
             />
             <div className="absolute inset-0 bg-black/40"></div>
             
             {/* Content */}
             <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
               <div className={`max-w-2xl space-y-6 transform transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                 <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
                   {slide.subtitle}
                 </span>
                 <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-tight">
                   {slide.title.split(' ')[0]} <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-hux-turquoise to-white">
                     {slide.title.split(' ')[1]}
                   </span>
                 </h1>
                 <p className="text-xl text-neutral-200 max-w-md font-light">
                   {slide.desc}
                 </p>
                 <div className="pt-8 flex gap-4">
                   <Button variant="primary">Shop Now</Button>
                   <Button variant="glass" className="text-white border-white hover:bg-white hover:text-hux-dark">Watch Film <Play size={14} className="ml-2 fill-current"/></Button>
                 </div>
               </div>

               {/* Right Side 3D Card Stack Visual */}
               <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-1/2 perspective-1000">
                  <div className={`relative w-full h-full transition-all duration-1000 ${index === currentSlide ? 'rotate-y-0 opacity-100' : 'rotate-y-12 opacity-0'}`}>
                     {/* Decorative Floating Cards */}
                     <div className="absolute top-0 right-10 w-64 h-80 glass-card rounded-3xl transform rotate-12 translate-z-12 animate-float"></div>
                     <div className="absolute top-10 right-20 w-64 h-80 bg-gradient-to-br from-hux-turquoise to-blue-600 rounded-3xl opacity-90 transform -rotate-6 translate-z-0 shadow-2xl animate-float" style={{animationDelay: '1s'}}></div>
                  </div>
               </div>
             </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <div className="absolute bottom-10 left-6 md:left-20 z-20 flex gap-2">
           {slides.map((_, i) => (
             <button 
               key={i} 
               onClick={() => setCurrentSlide(i)}
               className={`h-1 transition-all duration-300 rounded-full ${i === currentSlide ? 'w-12 bg-hux-turquoise' : 'w-4 bg-white/50 hover:bg-white'}`}
             />
           ))}
        </div>
      </section>

      {/* 2. 360 STUDIO SECTION */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 space-y-8">
            <h2 className="text-5xl font-display font-bold text-hux-dark leading-tight">
              360° of <br/>
              <span className="text-hux-turquoise">Perfection</span>
            </h2>
            <p className="text-xl text-neutral-500 font-light leading-relaxed">
              Experience the HUX Smart Ring from every angle. Crafted from aerospace-grade titanium, it features a seamless, button-free design that feels as good as it looks.
            </p>
            <div className="flex items-center gap-4 text-sm font-bold text-neutral-400 uppercase tracking-widest">
              <Rotate3d className="text-hux-turquoise animate-spin-slow" />
              <span>Interactive 3D View</span>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative h-[500px] flex items-center justify-center bg-neutral-50 rounded-[3rem] shadow-inner cursor-grab active:cursor-grabbing"
               onMouseDown={handleMouseDown}
               onMouseMove={handleMouseMove}
               onTouchStart={handleMouseDown}
               onTouchMove={handleMouseMove}
               ref={rotateRef}
          >
             {/* 3D Ring Object - Simulated with CSS */}
             <div className="relative w-64 h-64 perspective-1000" style={{ perspective: '1000px' }}>
                <div className="w-full h-full relative transform-style-3d transition-transform duration-75 ease-out"
                     style={{ transform: `rotateX(-15deg) rotateY(${rotation}deg)` }}>
                   
                   {/* Ring Outer Face */}
                   <div className="absolute inset-0 rounded-full border-[30px] border-neutral-300 shadow-[0_0_50px_rgba(0,0,0,0.1)]"
                        style={{ 
                          borderColor: '#d1d5db', 
                          background: 'transparent',
                          transform: 'translateZ(0px)'
                        }}>
                   </div>
                   
                   {/* Ring Inner Face (Simulation) */}
                   <div className="absolute inset-0 rounded-full border-[30px] border-neutral-400 scale-[0.98]"
                        style={{ 
                          borderColor: '#9ca3af',
                          transform: 'translateZ(-5px)' 
                        }}>
                   </div>

                   {/* Highlights for metallic effect */}
                   <div className="absolute inset-0 rounded-full border-[30px] border-transparent border-t-white/80 border-b-black/10 blur-sm"></div>
                   
                   {/* Sensor bumps on inner ring */}
                   <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-black/80 rounded-full blur-[1px] transform translate-z-[-10px]"></div>
                </div>
             </div>

             {/* Instruction Overlay */}
             <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm text-xs font-bold text-neutral-500 uppercase tracking-wider pointer-events-none">
                  <Move size={14} /> Drag to Rotate
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 3. ORBITAL FEATURES (THE O-GRID) */}
      <section className="py-32 bg-hux-dark relative overflow-hidden text-white">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-hux-turquoise/10 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-sm font-bold text-hux-turquoise uppercase tracking-widest">Capabilities</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold">The Ring of Life.</h3>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">Hover to explore the technology woven into your lifestyle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuresList.map((feature, i) => (
              <div key={i} className="group relative aspect-square cursor-pointer perspective-1000">
                 {/* The 'O' Element - Circular Container that Morphs */}
                 <div className={`absolute inset-0 rounded-full group-hover:rounded-[2.5rem] border-[2px] border-white/10 ${feature.border} group-hover:border-[1px] bg-black overflow-hidden flex flex-col items-center justify-center text-center z-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl group-hover:shadow-[0_0_80px_rgba(2,179,217,0.3)] transform group-hover:scale-105`}>
                    
                    {/* Background Video - Transitions from Grayscale to Color */}
                    <video 
                      autoPlay muted loop playsInline 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                    >
                      <source src={feature.videoUrl} type="video/mp4" />
                    </video>
                    
                    {/* Dark Overlay that fades out on hover */}
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-700"></div>
                    
                    {/* Vignette for cinematic feel */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 opacity-80 pointer-events-none"></div>
                    
                    {/* Content Layer */}
                    <div className="relative z-10 p-6 flex flex-col items-center w-full transition-transform duration-700 group-hover:-translate-y-2">
                      
                      {/* Icon Container - Spins and Colors on Hover */}
                      <div className={`mb-4 p-4 rounded-full bg-white/5 backdrop-blur-md text-white border border-white/10 group-hover:bg-hux-turquoise group-hover:text-white group-hover:border-hux-turquoise transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:rotate-[360deg]`}>
                         <feature.icon size={32} strokeWidth={1.5} />
                      </div>
                      
                      <h4 className="text-xl font-bold font-display text-white mb-2 drop-shadow-lg tracking-wide group-hover:scale-105 transition-transform duration-500">{feature.title}</h4>
                      
                      {/* Description Slide Up */}
                      <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-700 ease-in-out w-4/5">
                         <div className="pt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                           <p className="text-xs text-neutral-100 leading-relaxed font-medium drop-shadow-md bg-black/20 backdrop-blur-md p-3 rounded-xl border border-white/5">
                             {feature.desc}
                           </p>
                         </div>
                      </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RING COLLECTION GRID - TRANSPARENT GLASS CARDS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
         <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-bold text-hux-turquoise uppercase tracking-widest">The Collection</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-hux-dark">Design That Disappears</h3>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { color: 'Tarnish Grey', bg: 'bg-neutral-200', price: '₹12,999' },
              { color: 'Sterling Gold', bg: 'bg-yellow-50', price: '₹12,999' }
            ].map((item, idx) => (
               <div 
                 key={idx}
                 onMouseEnter={() => setExpandedCard(item.color)}
                 onMouseLeave={() => setExpandedCard(null)}
                 className={`relative h-[500px] rounded-[2.5rem] overflow-hidden transition-all duration-500 group border border-neutral-200 shadow-sm hover:shadow-2xl ${expandedCard === item.color ? 'scale-[1.02]' : ''}`}
               >
                  <div className={`absolute inset-0 ${item.bg} opacity-20 transition-colors`}></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      {/* Ring Visual Placeholder */}
                      <div className={`w-48 h-48 rounded-full border-[24px] shadow-xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12 mb-8 ${
                        item.color === 'Tarnish Grey' ? 'border-neutral-500 bg-transparent' : 
                        'border-yellow-400 bg-transparent'
                      }`}></div>
                      
                      <h4 className="text-2xl font-display font-bold text-hux-dark mb-2">{item.color}</h4>
                      <p className="text-hux-turquoise font-medium mb-6">{item.price}</p>
                      
                      <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                         <Button variant="outline" onClick={() => addToCart(item.color as any, 9)}>Quick Add</Button>
                      </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 5. SMART ECOSYSTEM ACCORDION */}
      <section id="ecosystem" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               
               {/* Left: Text Accordion */}
               <div className="lg:w-1/2 space-y-2">
                  <h2 className="text-5xl font-display font-bold text-hux-dark mb-12">Total Body<br/>Intelligence</h2>
                  {ecosystemItems.map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      className={`cursor-pointer border-l-4 pl-6 py-6 transition-all duration-300 ${activeTab === idx ? 'border-hux-turquoise bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300'}`}
                    >
                       <h3 className={`text-2xl font-bold mb-2 flex items-center gap-3 ${activeTab === idx ? 'text-hux-dark' : 'text-neutral-400'}`}>
                         <item.icon size={24} className={activeTab === idx ? 'text-hux-turquoise' : 'text-neutral-300'} />
                         {item.title}
                       </h3>
                       <div className={`overflow-hidden transition-all duration-300 ${activeTab === idx ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <p className="text-neutral-500 leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>

               {/* Right: Image Swap */}
               <div className="lg:w-1/2 h-[600px] relative rounded-[3rem] overflow-hidden shadow-2xl">
                  {ecosystemItems.map((item, idx) => (
                     <div 
                       key={idx}
                       className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${activeTab === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                       style={{ backgroundImage: `url(${item.image})` }}
                     >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-10 left-10 text-white">
                           <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl inline-block border border-white/30">
                              <item.icon className="mb-2" />
                              <span className="font-bold">{item.title} Analytics</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

            </div>
         </div>
      </section>

      {/* 6. VIDEO INTEGRATION */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
         <video 
           autoPlay muted loop playsInline 
           className="absolute inset-0 w-full h-full object-cover"
         >
           <source src="https://assets.mixkit.co/videos/preview/mixkit-man-running-on-a-road-at-sunrise-33829-large.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-hux-turquoise/80 mix-blend-multiply"></div>
         <div className="absolute inset-0 bg-black/30"></div>
         
         <div className="relative z-10 text-center text-white px-6 max-w-4xl">
            <h2 className="text-6xl md:text-8xl font-display font-bold mb-8">Unstoppable</h2>
            <p className="text-2xl font-light mb-12 text-white/90">Built for the sweat, the rain, and the depths. 5ATM Waterproof.</p>
            <Button variant="glass" className="mx-auto text-white border-white">Explore Durability</Button>
         </div>
      </section>

      {/* 7. EXPANDING GALLERY */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 h-[500px] flex gap-4">
              {[
                { title: "Social", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000" },
                { title: "Work", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000" },
                { title: "Rest", img: "https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&q=80&w=1000" },
                { title: "Play", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000" }
              ].map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveGallery(idx)}
                    className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${activeGallery === idx ? 'flex-[4]' : 'flex-[1]'} bg-neutral-100`}
                  >
                     <div 
                       className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                       style={{ backgroundImage: `url(${item.img})` }}
                     />
                     <div className={`absolute inset-0 bg-black/30 transition-opacity ${activeGallery === idx ? 'opacity-0' : 'opacity-50 hover:opacity-30'}`}></div>
                     <div className="absolute bottom-8 left-8 text-white">
                        <h3 className={`font-bold text-2xl ${activeGallery === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-500`}>{item.title}</h3>
                     </div>
                  </div>
              ))}
          </div>
      </section>

      {/* 8. NEW: PRODUCT SPECIFICATIONS */}
      <section className="py-24 bg-neutral-50 relative overflow-hidden border-t border-neutral-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
               <h2 className="text-sm font-bold text-hux-turquoise uppercase tracking-widest">HUX Product Specifications</h2>
               <h3 className="text-4xl md:text-5xl font-display font-bold text-hux-dark">Engineered Precision.</h3>
               <p className="text-xl text-neutral-500">Designed for Everyday Brilliance.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
               {/* LEFT COLUMN */}
               <div className="space-y-10 text-center lg:text-right">
                  <div className="group hover:-translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors">Name</h4>
                    <p className="text-neutral-500 font-light">HUX-NEXus Smart Ring</p>
                  </div>
                   <div className="group hover:-translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors">Features</h4>
                    <p className="text-neutral-500 font-light leading-relaxed">Heart Rate, SpO₂, Temperature, Sleep, Stress, Activity, Recovery, VO₂ Max, Strain</p>
                  </div>
                   <div className="group hover:-translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors">Material</h4>
                    <p className="text-neutral-500 font-light">Titanium Alloy with Liquid Glass Coating</p>
                  </div>
                   <div className="group hover:-translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors">Sizes</h4>
                    <p className="text-neutral-500 font-light">6, 7, 8, 9, 10, 11, 12, 13</p>
                  </div>
                  <div className="group hover:-translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors">Colors</h4>
                    <p className="text-neutral-500 font-light">Gunmetal Black, Sterling Gold, Frost Silver, Rose</p>
                  </div>
               </div>

               {/* CENTER - ANIMATION */}
               <div className="relative h-[450px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-hux-turquoise/5 to-transparent rounded-full blur-3xl"></div>
                  
                  {/* Schematic Ring Visual */}
                  <div className="relative flex items-center justify-center">
                      {/* Outer Orbit */}
                      <div className="absolute w-[340px] h-[340px] border border-neutral-200/50 rounded-full animate-[spin_30s_linear_infinite]"></div>
                      <div className="absolute w-[340px] h-[340px] border-t border-b border-hux-turquoise/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                      
                      {/* Main Ring Chassis */}
                      <div className="w-64 h-64 rounded-full border-[16px] border-white shadow-[0_10px_40px_rgba(0,0,0,0.1),inset_0_0_40px_rgba(0,0,0,0.05)] relative bg-neutral-50 flex items-center justify-center z-10">
                          
                          {/* Inner Metal Band */}
                          <div className="absolute inset-0 border-[2px] border-neutral-200 rounded-full"></div>
                          
                          {/* Sensors */}
                          <div className="absolute top-2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse"></div>
                          <div className="absolute bottom-2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" style={{animationDelay: '1s'}}></div>
                          
                          {/* Core Branding */}
                          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner border border-neutral-100">
                             <div className="text-center">
                                <span className="block text-2xl font-display font-bold text-hux-dark tracking-tight">HUX</span>
                                <span className="text-[10px] text-hux-turquoise font-mono uppercase tracking-widest">NEXus</span>
                             </div>
                          </div>

                          {/* Orbiting Particles */}
                          <div className="absolute inset-[-20px] rounded-full animate-[spin_8s_linear_infinite]">
                              <div className="absolute top-0 left-1/2 w-2 h-2 bg-hux-turquoise rounded-full blur-[1px]"></div>
                          </div>
                      </div>
                  </div>
               </div>

               {/* RIGHT COLUMN */}
               <div className="space-y-10 text-center lg:text-left">
                  <div className="group hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors flex items-center justify-center lg:justify-start gap-2">Battery <Battery size={16} className="text-neutral-400"/></h4>
                    <p className="text-neutral-500 font-light">Rechargeable 25 mAh LiPo — Up to 7 Days</p>
                  </div>
                   <div className="group hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors flex items-center justify-center lg:justify-start gap-2">Connectivity <Wifi size={16} className="text-neutral-400"/></h4>
                    <p className="text-neutral-500 font-light">Bluetooth 5.2, Low Energy</p>
                  </div>
                   <div className="group hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors flex items-center justify-center lg:justify-start gap-2">Certifications <ShieldAlert size={16} className="text-neutral-400"/></h4>
                    <p className="text-neutral-500 font-light">5ATM, CE, RoHS, FCC, REACH, BIS</p>
                  </div>
                   <div className="group hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors flex items-center justify-center lg:justify-start gap-2">In the Box <Box size={16} className="text-neutral-400"/></h4>
                    <p className="text-neutral-500 font-light">Ring, USB Cable, Charging Case, Manual</p>
                  </div>
                   <div className="group hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors flex items-center justify-center lg:justify-start gap-2">Water Resistance <Droplets size={16} className="text-neutral-400"/></h4>
                    <p className="text-neutral-500 font-light">Yes — Up to 50m</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 9. NEW: UNBOXING EXPERIENCE */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16 space-y-4">
              <h2 className="text-sm font-bold text-hux-turquoise uppercase tracking-widest">Unboxing</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-hux-dark">The Complete Package</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  name: "HUX Smart Ring", 
                  desc: "Your ultimate health companion that tracks you 24/7 — seamlessly, stylishly, and smartly.",
                  img: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=600" // Close-up ring/tech shot
                },
                { 
                  name: "Charging Case", 
                  desc: "Compact and durable magnetic cradle for fast and safe charging.",
                  img: "https://images.unsplash.com/photo-1623945233182-4467d162c933?auto=format&fit=crop&q=80&w=600" // White case aesthetic
                },
                { 
                  name: "User Manual", 
                  desc: "Step-by-step guide to help you set up and experience HUX with ease.",
                  img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600" // Minimal booklet
                }
              ].map((item, idx) => (
                <div key={idx} className="group flex flex-col items-center text-center">
                   <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-8 border border-neutral-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                      <div className="absolute inset-0 bg-neutral-50 group-hover:bg-white transition-colors"></div>
                      <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   </div>
                   <h4 className="text-xl font-bold font-display text-hux-dark mb-2 group-hover:text-hux-turquoise transition-colors">{item.name}</h4>
                   <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 10. REVIEWS MASONRY GRID */}
      <section className="py-24 bg-hux-ivory overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-sm font-bold text-hux-turquoise uppercase tracking-widest">Community</h2>
               <h3 className="text-4xl font-display font-bold text-hux-dark mt-2">What People Are Saying</h3>
            </div>
            
            <MasonryGrid columns={columns} gap={6}>
              {huxTestimonials.map((review, idx) => (
                <div key={idx} className="relative rounded-3xl overflow-hidden group transition-all duration-300 hover:shadow-2xl border border-white/50">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                    <p className="text-lg font-medium leading-snug mb-4 italic text-neutral-100">"{review.feedback}"</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar}
                        className="w-10 h-10 rounded-full border-2 border-white/80"
                        alt={review.name}
                      />
                      <div>
                        <span className="block font-bold text-sm">{review.name}</span>
                        <span className="block text-xs text-hux-turquoise font-medium uppercase tracking-wide">{review.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </MasonryGrid>
         </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-32 bg-hux-dark text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hux-turquoise/20 rounded-full blur-[100px]"></div>
         
         <div className="relative z-10 max-w-2xl mx-auto px-6">
             <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">Ready to evolve?</h2>
             <p className="text-xl text-neutral-400 mb-12">Join the HUX ecosystem today and experience the future of personal health.</p>
             <Button variant="primary" className="mx-auto px-12 py-4 text-lg">Order Your HUX Ring</Button>
         </div>
      </section>

    </div>
  );
};