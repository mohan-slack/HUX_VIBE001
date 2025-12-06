import React, { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

interface SectionData {
  text: string;
  subtitle: string;
  img: string;
}

interface AnimatedSectionsProps {
  sections?: SectionData[];
  className?: string;
}

const AnimatedSections: React.FC<AnimatedSectionsProps> = ({
  sections = [],
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<any>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const currentIndexRef = useRef<number>(-1);
  const animatingRef = useRef<boolean>(false);
  const sectionsRefs = useRef<HTMLElement[]>([]);
  const imagesRefs = useRef<HTMLDivElement[]>([]);
  const outerRefs = useRef<HTMLDivElement[]>([]);
  const innerRefs = useRef<HTMLDivElement[]>([]);
  const headingRefs = useRef<HTMLHeadingElement[]>([]);
  const subtitleRefs = useRef<HTMLParagraphElement[]>([]);
  const counterCurrentRef = useRef<HTMLSpanElement | null>(null);
  const counterNextRef = useRef<HTMLSpanElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let loaded = 0;
    if (sections.length === 0) {
        setImagesLoaded(true);
        return;
    }
    sections.forEach((section) => {
      const img = new Image();
      img.src = section.img;
      img.onload = () => {
        loaded++;
        if (loaded === sections.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === sections.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, [sections]);

  const gotoSection = useCallback((index: number, direction: number) => {
    if (!containerRef.current || animatingRef.current) return;

    const sectionsElements = sectionsRefs.current as Element[];
    const images = imagesRefs.current as Element[];
    const outerWrappers = outerRefs.current as Element[];
    const innerWrappers = innerRefs.current as Element[];

    const wrap = gsap.utils.wrap(0, sectionsElements.length);
    index = wrap(index);
    animatingRef.current = true;

    const fromTop = direction === -1;
    const dFactor = fromTop ? -1 : 1;

    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: 'power1.inOut' },
      onComplete: () => {
        animatingRef.current = false;
      }
    });

    timelineRef.current = tl;

    if (currentIndexRef.current >= 0) {
      gsap.set(sectionsElements[currentIndexRef.current], { zIndex: 0 });
      tl.to(images[currentIndexRef.current], { xPercent: -15 * dFactor })
        .set(sectionsElements[currentIndexRef.current], { autoAlpha: 0 });
    }

    gsap.set(sectionsElements[index], { autoAlpha: 1, zIndex: 1 });

    tl.fromTo(
      [outerWrappers[index], innerWrappers[index]],
      {
        xPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor)
      },
      { xPercent: 0 },
      0
    )
      .fromTo(
        images[index],
        { xPercent: 15 * dFactor },
        { xPercent: 0 },
        0
      );

    // Animate Heading
    if (headingRefs.current[index]) {
      gsap.fromTo(headingRefs.current[index], 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
      );
    }
    
    // Animate Subtitle
    if (subtitleRefs.current[index]) {
      gsap.fromTo(subtitleRefs.current[index], 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.7 }
      );
    }

    // Counter Animation
    if (counterCurrentRef.current && counterNextRef.current) {
      counterNextRef.current.textContent = String(index + 1);
      
      gsap.set(counterNextRef.current, { yPercent: 100 * dFactor, opacity: 0 });
      gsap.to(counterCurrentRef.current, { yPercent: -100 * dFactor, opacity: 0, duration: 0.5, ease: 'power2.inOut' });
      gsap.to(counterNextRef.current, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.inOut', onComplete: () => {
         if (counterCurrentRef.current && counterNextRef.current) {
            counterCurrentRef.current.textContent = counterNextRef.current.textContent;
            gsap.set(counterCurrentRef.current, { yPercent: 0, opacity: 1 });
            gsap.set(counterNextRef.current, { opacity: 0 });
         }
      }});
    }

    currentIndexRef.current = index;
    setCurrentIndex(index);
  }, []);

  // --- Auto Play Logic ---
  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
        if (!animatingRef.current && imagesLoaded) {
            gotoSection(currentIndexRef.current + 1, 1);
        }
    }, 5000); // 5 Seconds per slide

    return () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [gotoSection, imagesLoaded]);


  useEffect(() => {
    if (!containerRef.current || !imagesLoaded || sections.length === 0) return;

    const ctx = gsap.context(() => {
        const outerWrappers = outerRefs.current as Element[];
        const innerWrappers = innerRefs.current as Element[];

        gsap.set(outerWrappers, { xPercent: 100 });
        gsap.set(innerWrappers, { xPercent: -100 });

        try {
          // NOTE: Removed 'wheel' from type to allow page scrolling
          observerRef.current = Observer.create({
            target: containerRef.current,
            type: 'touch,pointer', // Only swipe/drag. Wheel is freed for vertical scrolling.
            wheelSpeed: -1,
            onDown: () => {
              if (!animatingRef.current) {
                // Reset autoplay timer on manual interaction
                if (autoPlayRef.current) {
                    clearInterval(autoPlayRef.current);
                    autoPlayRef.current = setInterval(() => gotoSection(currentIndexRef.current + 1, 1), 5000);
                }
                gotoSection(currentIndexRef.current - 1, -1);
              }
            },
            onUp: () => {
              if (!animatingRef.current) {
                 // Reset autoplay timer on manual interaction
                 if (autoPlayRef.current) {
                    clearInterval(autoPlayRef.current);
                    autoPlayRef.current = setInterval(() => gotoSection(currentIndexRef.current + 1, 1), 5000);
                 }
                gotoSection(currentIndexRef.current + 1, 1);
              }
            },
            tolerance: 10,
            preventDefault: true
          });
        } catch (e) {
          console.warn("GSAP Observer initialization warning:", e);
        }

        gotoSection(0, 1);
    }, containerRef);

    return () => {
      ctx.revert();
      if (observerRef.current) {
        observerRef.current.kill();
        observerRef.current = null;
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [sections.length, imagesLoaded, gotoSection]);

  return (
    <div 
      ref={containerRef}
      className={`h-screen w-full relative overflow-hidden bg-black text-white font-sans ${className}`}
    >
      {/* Section preview thumbnails */}
      <div className="absolute bottom-8 right-6 z-30 flex items-center gap-4">
        <div className="flex gap-2">
          {sections.map((section, i) => (
            <div
              key={`thumb-${i}`}
              className="w-12 h-8 rounded border border-white/20 overflow-hidden relative cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                 borderColor: currentIndex === i ? '#02b3d9' : 'rgba(255,255,255,0.2)'
              }}
              onClick={() => {
                if (currentIndex !== i && !animatingRef.current) {
                  const direction = i > currentIndex ? 1 : -1;
                   // Reset autoplay timer
                   if (autoPlayRef.current) {
                    clearInterval(autoPlayRef.current);
                    autoPlayRef.current = setInterval(() => gotoSection(currentIndexRef.current + 1, 1), 5000);
                   }
                  gotoSection(i, direction);
                }
              }}
            >
              <img
                src={section.img}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div 
                 className={`absolute inset-0 bg-black transition-opacity duration-500 ease-in-out ${
                   currentIndex !== i ? 'opacity-50' : 'opacity-0'
                 }`} 
               />
            </div>
          ))}
        </div>
        
        {/* Counter */}
        <div className="text-sm tracking-wider flex items-center gap-1 font-display font-bold">
          <div className="relative overflow-hidden h-[1.5em] leading-[1.5em] w-[0.8em]">
            <span ref={counterCurrentRef} className="block absolute top-0 left-0">1</span>
            <span ref={counterNextRef} className="block absolute top-0 left-0 opacity-0">2</span>
          </div>
          <span className="opacity-50 text-hux-turquoise">/ {sections.length}</span>
        </div>
      </div>

      {sections.map((section, i) => (
        <section 
          key={`section-${i}`} 
          // CHANGED: 'fixed' to 'absolute' to allow page scrolling
          className="absolute top-0 left-0 h-full w-full invisible"
          ref={(el) => { if (el) sectionsRefs.current[i] = el; }}
        >
          <div className="outer w-full h-full overflow-hidden" ref={(el) => { if (el) outerRefs.current[i] = el; }}>
            <div className="inner w-full h-full overflow-hidden" ref={(el) => { if (el) innerRefs.current[i] = el; }}>
              <div
                className="bg flex items-center justify-center absolute top-0 h-full w-full bg-cover bg-center"
                ref={(el) => { if (el) imagesRefs.current[i] = el; }}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%), url("${section.img}")`
                }}
              >
                <div className="relative z-10 text-center px-4 max-w-5xl">
                   <p 
                     ref={(el) => { if (el) subtitleRefs.current[i] = el; }}
                     className="text-hux-turquoise font-bold uppercase tracking-[0.3em] mb-4 text-sm md:text-base opacity-0"
                   >
                     {section.subtitle}
                   </p>
                   <h2 
                     className="section-heading text-white font-display font-bold text-5xl md:text-8xl lg:text-9xl leading-tight opacity-0 drop-shadow-2xl" 
                     ref={(el) => { if (el) headingRefs.current[i] = el; }}
                   >
                     {section.text}
                   </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      
      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce pointer-events-none">
         <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse"></div>
         </div>
      </div>
    </div>
  );
};

export default AnimatedSections;