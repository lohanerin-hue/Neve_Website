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
    answer: 'Névé goes beyond basic cleaning. We combine precision, high-end products, and meticulous attention to detail to deliver results that don’t just clean — they elevate and preserve your space.',
  },
  {
    question: 'Do you work during business hours?',
    answer: 'Yes — we operate during business hours and can also adapt to your schedule when needed. Our priority is to deliver a seamless service with minimal disruption.',
  },
  {
    question: 'Can you handle post-event resets?',
    answer: ' Absolutely. Névé specializes in fast, efficient post-event resets — restoring your space to a clean, polished, and ready-to-use standard with precision and discretion.',
  },
  {
    question: 'What is selective sorting?',
    answer: 'Selective sorting is the process of separating waste by type — such as paper, plastic, glass, and organic materials — to ensure proper recycling and responsible disposal. ',
  },
  {
    question: 'Are your products eco-certified?',
    answer: 'Selective sorting is the process of separating waste by type — such as paper, plastic, glass, and organic materials — to ensure proper recycling and responsible disposal. At Névé, we integrate this approach into our service to support cleaner spaces and more sustainable practices.',
  },
  {
    question: 'How do I get a quote?',
    answer: 'Just contact us with a few details about your needs, and we’ll provide a tailored estimate quickly and transparently.',
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