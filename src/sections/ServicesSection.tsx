import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Download, Sparkles, Calendar, RotateCcw, Gem } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Calendar,
    title: 'Daily Maintenance',
    description: 'Quiet, thorough, scheduled around you.',
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    description: 'High-touch detail for openings, closings, and turnovers.',
  },
  {
    icon: RotateCcw,
    title: 'Post-Event Reset',
    description: 'Rapid recovery after shows, dinners, and launches.',
  },
  {
    icon: Gem,
    title: 'Specialty Surface Care',
    description: 'Marble, mirror, metal, and delicate finishes.',
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const serviceListRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const imageCard = imageCardRef.current;
    const headline = headlineRef.current;
    const serviceList = serviceListRef.current;
    const cta = ctaRef.current;

    if (!section || !bg || !imageCard || !headline || !serviceList || !cta) return;

    const serviceItems = serviceList.querySelectorAll('.service-item');

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
          imageCard,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          headline,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

      // Service items stagger
      serviceItems.forEach((item, index) => {
        scrollTl.fromTo(
          item,
          { x: '18vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05 + index * 0.03
        );
      });

      scrollTl.fromTo(
        cta,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // EXIT (70% - 100%)
      scrollTl
        .to(
          imageCard,
          { x: '-18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .to(
          [headline, serviceList],
          { x: '18vw', opacity: 0.2, ease: 'power2.in' },
          0.7
        )
        .to(
          cta,
          { opacity: 0, ease: 'power2.in' },
          0.8
        )
        .to(
          bg,
          { opacity: 0.35, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-pinned z-30"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/services_operations.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform, opacity',
        }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 vignette-overlay" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-neve-dark/55" />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {/* Image Card - Left */}
        <div
          ref={imageCardRef}
          className="absolute rounded-2xl overflow-hidden card-shadow"
          style={{
            left: '7vw',
            top: '18vh',
            width: '44vw',
            height: '62vh',
            willChange: 'transform, opacity',
          }}
        >
          <img
            src="/images/services_card_image.jpg"
            alt="Professional cleaning service"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Headline - Right */}
        <div
          ref={headlineRef}
          className="absolute"
          style={{
            left: '58vw',
            top: '22vh',
            width: '34vw',
            willChange: 'transform, opacity',
          }}
        >
          <h2
            className="font-heading font-bold text-neve-white"
            style={{ fontSize: 'clamp(34px, 3.6vw, 56px)' }}
          >
            Services
          </h2>
          <p
            className="mt-4 text-neve-gray"
            style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', lineHeight: 1.6 }}
          >
            From daily maintenance to post-event reset, we keep every surface flawless—without disrupting your operations.
          </p>
        </div>

        {/* Service List - Right */}
        <div
          ref={serviceListRef}
          className="absolute flex flex-col gap-5"
          style={{
            left: '58vw',
            top: '46vh',
            width: '34vw',
            willChange: 'transform, opacity',
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item flex items-start gap-4"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neve-teal/20 flex items-center justify-center">
                <service.icon className="w-5 h-5 text-neve-teal" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-neve-white text-base">
                  {service.title}
                </h3>
                <p className="text-neve-gray text-sm mt-0.5">
                  {service.description}
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
            top: '78vh',
            willChange: 'transform, opacity',
          }}
        >
          <Button
            variant="outline"
            className="border-neve-teal text-neve-teal hover:bg-neve-teal/10 rounded-full px-6 py-5 text-sm font-medium transition-all duration-200 group"
          >
            <Download className="mr-2 w-4 h-4" />
            Download the service sheet
          </Button>
        </div>
      </div>
    </section>
  );
}