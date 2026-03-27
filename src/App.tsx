import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navigation } from './components/Navigation';
import { GrainOverlay } from './components/GrainOverlay';
import { HeroSection } from './sections/HeroSection';
import { StandardSection } from './sections/StandardSection';
import { ServicesSection } from './sections/ServicesSection';
import { SortingSection } from './sections/SortingSection';
import { BeforeAfterSection } from './sections/BeforeAfterSection';
import { SpacesSection } from './sections/SpacesSection';
import { ClientRosterSection } from './sections/ClientRosterSection';
import { FAQSection } from './sections/FAQSection';
import { ContactSection } from './sections/ContactSection';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            // If not in pinned section, allow free scroll
            if (!inPinned) return value;

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      // Only kill the global snap trigger on unmount, not all triggers
      const allTriggers = ScrollTrigger.getAll();
      const globalSnap = allTriggers.find((st) => st.vars.snap && !st.vars.pin);
      if (globalSnap) {
        globalSnap.kill();
      }
    };
  }, []);

  return (
    <div className="relative bg-neve-dark">
      {/* Navigation */}
      <Navigation />

      {/* Grain Overlay */}
      <GrainOverlay />

      {/* Sections with z-index stacking */}
      <main className="relative">
        <HeroSection />
        <StandardSection />
        <ServicesSection />
        <SortingSection />
        <BeforeAfterSection />
        <SpacesSection />
        <ClientRosterSection />
        <FAQSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;