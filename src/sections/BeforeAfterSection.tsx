import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const beforeBgRef = useRef<HTMLDivElement>(null);
  const afterBgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const microLeftRef = useRef<HTMLSpanElement>(null);
  const microRightRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const beforeBg = beforeBgRef.current;
    const afterBg = afterBgRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const microLeft = microLeftRef.current;
    const microRight = microRightRef.current;

    if (!section || !beforeBg || !afterBg || !headline || !subheadline || !microLeft || !microRight) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          headline,
          { y: '40vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          subheadline,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          [microLeft, microRight],
          { opacity: 0 },
          { opacity: 1, ease: 'none' },
          0.15
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%) with wipe reveal
      // The after background reveals as a wipe
      scrollTl
        .fromTo(
          afterBg,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', ease: 'power2.inOut' },
          0.7
        )
        .to(
          headline,
          { opacity: 0.2, ease: 'power2.in' },
          0.85
        )
        .to(
          subheadline,
          { opacity: 0.2, ease: 'power2.in' },
          0.87
        )
        .to(
          [headline, subheadline],
          { opacity: 0, ease: 'power2.in' },
          0.95
        )
        .to(
          [microLeft, microRight],
          { opacity: 0, ease: 'power2.in' },
          0.9
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-50"
    >
      {/* Before Background Image */}
      <div
        ref={beforeBgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/beforeafter_background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* After Background Image (with wipe reveal) */}
      <div
        ref={afterBgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/after_background_layer.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'inset(0 100% 0 0)',
          willChange: 'clip-path',
        }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 vignette-overlay" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-neve-dark/40" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-heading font-bold text-neve-white text-center"
          style={{
            fontSize: 'clamp(44px, 5vw, 76px)',
            willChange: 'opacity',
          }}
        >
          Before / After
        </h2>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-6 text-neve-gray text-center max-w-xl"
          style={{
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            lineHeight: 1.6,
            willChange: 'opacity',
          }}
        >
          We reset the room—fast, quiet, and completely.
        </p>
      </div>

      {/* Micro Labels */}
      <span
        ref={microLeftRef}
        className="absolute bottom-8 left-8 font-mono-label text-neve-gray/70 z-10"
        style={{ willChange: 'opacity' }}
      >
        Before
      </span>
      <span
        ref={microRightRef}
        className="absolute bottom-8 right-8 font-mono-label text-neve-teal z-10"
        style={{ willChange: 'opacity' }}
      >
        After
      </span>
    </section>
  );
}