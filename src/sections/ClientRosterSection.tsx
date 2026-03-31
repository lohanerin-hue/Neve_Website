import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Flawless every time.',
    text: 'Névé keeps our showroom pristine without interrupting the client experience.',
    author: 'Creative Director',
    company: 'Atelier Noir',
  },
  {
    quote: 'Invisible and efficient.',
    text: 'They reset our event spaces overnight—like we were never there.',
    author: 'Event Manager',
    company: 'Privé Events',
  },
  {
    quote: 'A true partner.',
    text: 'Reliable, discreet, and always one step ahead.',
    author: 'Operations Director',
    company: 'Maison Lumière',
  },
];

const clientLogos = [
  'Yves-Saint Laurent',
  'Dior',
  'Hermès',
  'Bureau Betak',
  'Pad Paris Design',
  'Villa Eugénie',
  'and more...',  
];

export function ClientRosterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;
    const logos = logosRef.current;

    if (!section || !headline || !cards || !logos) return;

    const cardItems = cards.querySelectorAll('.testimonial-card');
    const logoItems = logos.querySelectorAll('.logo-item');

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headline,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger reveal
      cardItems.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cards,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Logos fade in
      gsap.fromTo(
        logoItems,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: logos,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="relative bg-neve-dark py-24 lg:py-32 z-[70]"
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-16">
          <span className="font-mono-label text-neve-teal block mb-4">
            CLIENT ROSTER
          </span>
          <h2
            className="font-heading font-bold text-neve-white"
            style={{ fontSize: 'clamp(34px, 3.6vw, 56px)' }}
          >
            Trusted by teams who don't compromise.
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="testimonial-card bg-neve-dark/50 border-neve-white/10 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-neve-teal mb-4" />
                <h3 className="font-heading font-semibold text-neve-white text-lg mb-3">
                  "{testimonial.quote}"
                </h3>
                <p className="text-neve-gray text-sm mb-6 leading-relaxed">
                  {testimonial.text}
                </p>
                <div className="pt-4 border-t border-neve-white/10">
                  <p className="text-neve-white text-sm font-medium">
                    {testimonial.author}
                  </p>
                  <p className="text-neve-gray text-xs">
                    {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Logos */}
        <div ref={logosRef} className="text-center">
          <span className="font-mono-label text-neve-gray block mb-8">
            Trusted by
          </span>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="logo-item text-neve-gray/60 font-heading font-semibold text-lg hover:text-neve-white/80 transition-colors duration-300 cursor-default"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}