import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function StandardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const statCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const microLabel = microLabelRef.current;
    const headline = headlineRef.current;
    const imageCard = imageCardRef.current;
    const statCard = statCardRef.current;

    if (!section || !bg || !microLabel || !headline || !imageCard || !statCard) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          bg,
          { x: '6vw', scale: 1.06, opacity: 0.6 },
          { x: 0, scale: 1, opacity: 1, ease: 'none' },
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
        )
        .fromTo(
          imageCard,
          { x: '55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          statCard,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );

      // SETTLE (30% - 70%) - hold positions

      // EXIT (70% - 100%)
      scrollTl
        .to(
          headline,
          { x: '-18vw', opacity: 0.2, ease: 'power2.in' },
          0.7
        )
        .to(
          imageCard,
          { x: '18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .to(
          statCard,
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.75
        )
        .to(
          microLabel,
          { opacity: 0, ease: 'power2.in' },
          0.75
        )
        .to(
          bg,
          { scale: 1.05, opacity: 0.35, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-20"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/standard_lifestyle.jpg)',
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
        THE NÉVÉ STANDARD
      </span>

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {/* Headline Block - Left */}
        <div
          ref={headlineRef}
          className="absolute"
          style={{
            left: '9vw',
            top: '26vh',
            width: '34vw',
            willChange: 'transform, opacity',
          }}
        >
          <h2
            className="font-heading font-bold text-neve-white"
            style={{ fontSize: 'clamp(34px, 3.6vw, 56px)' }}
          >
            Precision you can see. Service you can't.
          </h2>
          <p
            className="mt-6 text-neve-gray"
            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.6 }}
          >
            We protect your interiors, your reputation, and your time—so your team can focus on the guest experience.
          </p>
        </div>

        {/* Image Card - Right */}
        <div
          ref={imageCardRef}
          className="absolute rounded-2xl overflow-hidden card-shadow"
          style={{
            left: '58vw',
            top: '22vh',
            width: '33vw',
            height: '56vh',
            willChange: 'transform, opacity',
          }}
        >
          <img
            src="/images/standard_card_image.jpg"
            alt="Showroom-ready finishes"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <span className="font-mono-label text-neve-white/80">Showroom-ready finishes.</span>
          </div>
        </div>

        {/* Stat Card - Bottom Left */}
        <div
          ref={statCardRef}
          className="absolute rounded-2xl p-6 flex flex-col justify-center"
          style={{
            left: '9vw',
            top: '72vh',
            width: '18vw',
            height: '14vh',
            backgroundColor: 'rgba(11, 13, 16, 0.65)',
            backdropFilter: 'blur(8px)',
            willChange: 'transform, opacity',
          }}
        >
          <span className="font-heading font-bold text-neve-teal" style={{ fontSize: 'clamp(36px, 3vw, 48px)' }}>
            98%
          </span>
          <span className="font-mono-label text-neve-gray mt-1">client retention</span>
        </div>
      </div>
    </section>
  );
}