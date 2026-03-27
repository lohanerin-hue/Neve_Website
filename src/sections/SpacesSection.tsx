import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shirt, Building2, PartyPopper, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const verticals = [
  {
    icon: Shirt,
    title: 'Fashion & Retail',
    description: 'Showrooms, boutiques, galleries.',
  },
  {
    icon: Building2,
    title: 'Hospitality',
    description: 'Hotels, private residences, clubs.',
  },
  {
    icon: PartyPopper,
    title: 'Events & Production',
    description: 'Set builds, launches, activations.',
  },
  {
    icon: Briefcase,
    title: 'Corporate',
    description: 'Offices, boardrooms, experience centers.',
  },
];

export function SpacesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const verticalsListRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const microLabel = microLabelRef.current;
    const headline = headlineRef.current;
    const verticalsList = verticalsListRef.current;
    const cta = ctaRef.current;

    if (!section || !bg || !microLabel || !headline || !verticalsList || !cta) return;

    const verticalItems = verticalsList.querySelectorAll('.vertical-item');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          bg,
          { y: '8vh', scale: 1.07, opacity: 0.7 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          microLabel,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          headline,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

      // Vertical items stagger
      verticalItems.forEach((item, index) => {
        scrollTl.fromTo(
          item,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05 + index * 0.04
        );
      });

      scrollTl.fromTo(
        cta,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.25
      );

      // EXIT (70% - 100%)
      scrollTl
        .to(
          headline,
          { x: '-18vw', opacity: 0.2, ease: 'power2.in' },
          0.7
        )
        .to(
          verticalsList,
          { x: '18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .to(
          cta,
          { opacity: 0, ease: 'power2.in' },
          0.8
        )
        .to(
          microLabel,
          { opacity: 0, ease: 'power2.in' },
          0.75
        )
        .to(
          bg,
          { opacity: 0.35, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-[60]"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/spaces_background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform, opacity',
        }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 vignette-overlay" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-neve-dark/50" />

      {/* Micro Label */}
      <span
        ref={microLabelRef}
        className="absolute top-8 left-1/2 -translate-x-1/2 font-mono-label text-neve-teal z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        SPACES WE SERVE
      </span>

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {/* Headline Block - Left */}
        <div
          ref={headlineRef}
          className="absolute"
          style={{
            left: '9vw',
            top: '22vh',
            width: '34vw',
            willChange: 'transform, opacity',
          }}
        >
          <h2
            className="font-heading font-bold text-neve-white"
            style={{ fontSize: 'clamp(34px, 3.6vw, 56px)' }}
          >
            Built for luxury environments.
          </h2>
          <p
            className="mt-6 text-neve-gray"
            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.6 }}
          >
            Protocols designed for high traffic, high standards, and zero downtime.
          </p>
        </div>

        {/* Verticals List - Right */}
        <div
          ref={verticalsListRef}
          className="absolute flex flex-col gap-6"
          style={{
            left: '58vw',
            top: '26vh',
            width: '34vw',
            willChange: 'transform, opacity',
          }}
        >
          {verticals.map((vertical, index) => (
            <div
              key={index}
              className="vertical-item flex items-start gap-4 pb-6 border-b border-neve-white/10 last:border-0"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neve-teal/20 flex items-center justify-center">
                <vertical.icon className="w-5 h-5 text-neve-teal" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-neve-white text-base">
                  {vertical.title}
                </h3>
                <p className="text-neve-gray text-sm mt-0.5">
                  {vertical.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA - Right Bottom */}
        <div
          ref={ctaRef}
          className="absolute"
          style={{
            left: '58vw',
            top: '74vh',
            willChange: 'transform, opacity',
          }}
        >
          <Button
            onClick={scrollToContact}
            className="bg-neve-teal text-neve-dark hover:bg-neve-teal/90 rounded-full px-6 py-5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] group"
          >
            Tell us about your space
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}