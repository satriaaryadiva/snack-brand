import AnimatedBackground from '@/components/AnimatedBackground';
import FloatingParticles from '@/components/FloatingParticles';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BagRevealStorySection from '@/components/BagRevealStorySection';
import StickyProductSection from '@/components/StickyProductSection';
import ShogunSection from '@/components/ShogunSection';
import KaaroSection from '@/components/KaaroSection';
import BrandStorySection from '@/components/BrandStorySection';
import CertificationSection from '@/components/CertificationSection';
import KaaroStorySection from '@/components/KaaroStorySection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      {/* Fixed-layer effects (z-0) */}
      <AnimatedBackground />
      <FloatingParticles />

      {/* Page content (z-10+) */}
      <main className="relative z-10">
        <Navbar />
        <HeroSection />
        <BagRevealStorySection />
        <KaaroStorySection />
        <StickyProductSection />
        <ShogunSection />
        <KaaroSection />
        <BrandStorySection />
        <CertificationSection />
        <TestimonialSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
