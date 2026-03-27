import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? 'bg-neve-dark/90 backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full px-8 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-heading text-2xl font-bold text-neve-white tracking-tight"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Név<span className="text-neve-teal">é</span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('services')}
            className="text-sm text-neve-gray hover:text-neve-white transition-colors duration-200"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('sorting')}
            className="text-sm text-neve-gray hover:text-neve-white transition-colors duration-200"
          >
            Sorting
          </button>
          <button
            onClick={() => scrollToSection('clients')}
            className="text-sm text-neve-gray hover:text-neve-white transition-colors duration-200"
          >
            Clients
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm text-neve-gray hover:text-neve-white transition-colors duration-200"
          >
            FAQ
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm text-neve-gray hover:text-neve-white transition-colors duration-200"
          >
            Contact
          </button>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => scrollToSection('contact')}
          className="bg-neve-teal text-neve-dark hover:bg-neve-teal/90 rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
        >
          Request a quote
        </Button>
      </div>
    </nav>
  );
}