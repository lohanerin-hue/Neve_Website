import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const formCard = formCardRef.current;

    if (!section || !leftContent || !formCard) return;

    const ctx = gsap.context(() => {
      // Left content slide in
      gsap.fromTo(
        leftContent,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form card slide in
      gsap.fromTo(
        formCard,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-neve-light py-24 lg:py-32 z-[90]"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Content */}
          <div ref={leftContentRef}>
            <h2
              className="font-heading font-bold text-neve-dark"
              style={{ fontSize: 'clamp(34px, 3.6vw, 56px)' }}
            >
              Let's keep your space immaculate.
            </h2>
            <p
              className="mt-6 text-gray-600 leading-relaxed"
              style={{ fontSize: 'clamp(15px, 1.2vw, 18px)' }}
            >
              Tell us what you need. We'll reply within one business day.
            </p>

            {/* Contact Details */}
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-neve-teal/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-neve-teal" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-neve-dark font-medium">hello@neve.fr</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-neve-teal/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-neve-teal" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-neve-dark font-medium">+33 1 43 48 38 12</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-neve-teal/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-neve-teal" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-neve-dark font-medium">70 rue René Boulanger, 75010 Paris</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-neve-teal/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-neve-teal" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hours</p>
                  <p className="text-neve-dark font-medium">Mon–Sat: 07:00–22:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div ref={formCardRef}>
            <Card className="bg-white border-0 shadow-card">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle className="w-16 h-16 text-neve-teal mb-4" />
                    <h3 className="font-heading font-semibold text-neve-dark text-xl mb-2">
                      Message sent!
                    </h3>
                    <p className="text-gray-600">
                      We'll be in touch within one business day.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-4" name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neve-dark mb-2">
                          Name
                        </label>
                        <Input
                          type="text"
                          name="name"
                          placeholder="nom"
                          required
                          className="bg-gray-50 border-gray-200 focus:border-neve-teal focus:ring-neve-teal/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neve-dark mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email"
                          required
                          className="bg-gray-50 border-gray-200 focus:border-neve-teal focus:ring-neve-teal/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neve-dark mb-2">
                          Company
                        </label>
                        <Input
                          type="text"
                          placeholder="Your company"
                          className="bg-gray-50 border-gray-200 focus:border-neve-teal focus:ring-neve-teal/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neve-dark mb-2">
                          Space Type
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g. Hotel, Showroom"
                          className="bg-gray-50 border-gray-200 focus:border-neve-teal focus:ring-neve-teal/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neve-dark mb-2">
                        Message
                      </label>
                      <Textarea 
                        name="message"
                        placeholder="Tell us about your space and needs..."
                        rows={5}
                        required
                        className="bg-gray-50 border-gray-200 focus:border-neve-teal focus:ring-neve-teal/20 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-neve-teal text-neve-dark hover:bg-neve-teal/90 rounded-full py-6 text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] group"
                    >
                      <Send className="mr-2 w-4 h-4" />
                      Request a quote
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-8 mt-20 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Névé. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 text-sm hover:text-neve-dark transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-neve-dark transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}