import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microLeftRef = useRef<HTMLSpanElement>(null);
  const microRightRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const microLeft = microLeftRef.current;
    const microRight = microRightRef.current;

    if (!section || !bg || !headline || !subheadline || !cta || !microLeft || !microRight) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([headline, subheadline, cta], { opacity: 0, y: 24 });
      gsap.set([microLeft, microRight], { opacity: 0 });
      gsap.set(bg, { scale: 1.08 });

      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ delay: 0.3 });
      
      loadTl
        .to(bg, { scale: 1, duration: 1.1, ease: 'power2.out' })
        .to(headline, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .to(subheadline, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .to(cta, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to([microLeft, microRight], { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset elements when scrolling back to top
            gsap.set([headline, subheadline, cta], { opacity: 1, y: 0 });
            gsap.set([microLeft, microRight], { opacity: 1 });
            gsap.set(bg, { scale: 1, opacity: 1 });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(
          [headline, subheadline, cta],
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0.15, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          [microLeft, microRight],
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(
          bg,
          { scale: 1, opacity: 1 },
          { scale: 1.06, opacity: 0.35, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/hero_interior.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform, opacity',
        }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 vignette-overlay" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-neve-dark/30" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8">
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-heading font-bold text-neve-white text-center"
          style={{
            fontSize: 'clamp(44px, 5vw, 76px)',
            willChange: 'transform, opacity',
          }}
        >
          Immaculate spaces.
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-6 text-neve-gray text-center max-w-2xl"
          style={{
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            lineHeight: 1.6,
            willChange: 'transform, opacity',
          }}
        >
          White-glove cleaning and selective sorting for fashion, events, and hospitality.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          style={{ willChange: 'transform, opacity' }}
        >
          <Button
            onClick={scrollToContact}
            className="bg-neve-teal text-neve-dark hover:bg-neve-teal/90 rounded-full px-8 py-6 text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] group"
          >
            Request a quote
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
          <Button
            onClick={scrollToServices}
            variant="outline"
            className="border-neve-white/30 text-neve-white hover:bg-neve-white/10 hover:border-neve-white/50 rounded-full px-8 py-6 text-base font-medium transition-all duration-200"
          >
            See our services
          </Button>
        </div>
      </div>

      {/* Micro Labels */}
      <span
        ref={microLeftRef}
        className="absolute bottom-8 left-8 font-mono-label text-neve-gray/70 z-10"
        style={{ willChange: 'opacity' }}
      >
        Paris • Worldwide
      </span>
      <span
        ref={microRightRef}
        className="absolute bottom-8 right-8 font-mono-label text-neve-gray/70 z-10"
        style={{ willChange: 'opacity' }}
      >
        Eco-certified cleaning
      </span>
    </section>
  );
}