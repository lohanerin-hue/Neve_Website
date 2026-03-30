import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
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
      gsap.fromTo(leftContent, { x: -40, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%' },
      });

      gsap.fromTo(formCard, { x: 40, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    emailjs.sendForm(
      "service_zzznobb",
      "template_3n4wlcv",
      form,
      "eig7-6Zgx5-XNLWIH" // 🔴 METS TA PUBLIC KEY ICI
    )
    .then(() => {
      console.log("SUCCESS");
      setIsSubmitted(true);
      form.reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    })
    .catch((error) => {
      console.error("FAILED", error);
      alert("Erreur lors de l'envoi");
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="bg-neve-light py-24">
      <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-12">

        {/* LEFT */}
        <div ref={leftContentRef}>
          <h2 className="text-4xl font-bold text-neve-dark">
            Let's keep your space immaculate.
          </h2>

          <p className="mt-4 text-gray-600">
            Tell us what you need. We'll reply within one business day.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="text-neve-teal" />
              <p className="text-gray-900">lohan.erin@neve.paris</p>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-neve-teal" />
              <p className="text-gray-900">+33 7 46 48 34 37</p>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-neve-teal" />
              <p className="text-gray-900">70 rue Rene Boulanger 75010 Paris</p>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="text-neve-teal" />
              <p className="text-gray-900">Mon–Sat: 07:00–22:00</p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div ref={formCardRef}>
          <Card className="bg-white shadow-lg rounded-2xl">
            <CardContent className="p-8">

              {isSubmitted ? (
                <div className="text-center">
                  <CheckCircle className="mx-auto text-neve-teal" />
                  <p className="text-gray-900">Message envoyé !</p>
                </div>
              ) : (

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input name="name" placeholder="Nom" required className="text-black" />
                  <Input name="email" type="email" placeholder="Email" required className="text-black" />
                  <Input name="company" placeholder="Entreprise" className="text-black" />
                  <Input name="space" placeholder="Type d'espace" className="text-black" />
                  <Textarea name="message" placeholder="Message..." required className="text-black" />

                  <Button type="submit" className="w-full bg-neve-teal">
                    <Send className="mr-2" />
                    Envoyer
                  </Button>
                </form>

              )}

            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}