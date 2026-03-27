import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What makes Névé different from standard cleaning?',
    answer: 'We specialize in luxury environments where discretion and precision are paramount. Our teams are trained in white-glove protocols, use eco-certified products, and work around your schedule—never disrupting your operations or guest experience.',
  },
  {
    question: 'Do you work during business hours?',
    answer: 'We offer flexible scheduling including early morning, evening, and overnight services. For hospitality and retail clients, we typically work outside peak hours to ensure zero disruption to your guests.',
  },
  {
    question: 'Can you handle post-event resets?',
    answer: 'Absolutely. Post-event reset is one of our core specialties. We have rapid-response teams that can transform a venue from event mode to pristine condition overnight—often within hours of the last guest departing.',
  },
  {
    question: 'What is selective sorting?',
    answer: 'Selective sorting is our comprehensive waste management system where we separate materials at the source—organics, recyclables, hazardous materials, and landfill. We then track and report diversion rates, helping you meet sustainability goals.',
  },
  {
    question: 'Are your products eco-certified?',
    answer: 'Yes. We exclusively use products with recognized eco-certifications (Ecolabel, Ecocert). Our commitment to environmental responsibility is core to our service—without compromising on cleaning efficacy.',
  },
  {
    question: 'How do I get a quote?',
    answer: 'Simply fill out the contact form below or call us directly. We will schedule a brief consultation to understand your space, needs, and schedule, then provide a detailed proposal within 24 hours.',
  },
];

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const accordion = accordionRef.current;

    if (!section || !headline || !accordion) return;

    const accordionItems = accordion.querySelectorAll('.accordion-item');

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

      // Accordion items stagger
      accordionItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: accordion,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-neve-dark py-24 lg:py-32 z-[80]"
    >
      <div className="max-w-3xl mx-auto px-8">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-12">
          <span className="font-mono-label text-neve-teal block mb-4">
            FAQ
          </span>
          <h2
            className="font-heading font-bold text-neve-white"
            style={{ fontSize: 'clamp(34px, 3.6vw, 56px)' }}
          >
            Questions. Answered.
          </h2>
        </div>

        {/* Accordion */}
        <div ref={accordionRef}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="accordion-item border-b border-neve-white/10"
              >
                <AccordionTrigger className="text-neve-white text-left hover:text-neve-teal transition-colors duration-200 py-6 text-base font-heading font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-neve-gray pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}