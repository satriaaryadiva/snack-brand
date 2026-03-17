import AnimatedBackground from '@/components/AnimatedBackground';
import FloatingParticles from '@/components/FloatingParticles';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ScrollIndicator from '@/components/ScrollIndicator';
import BagRevealStorySection from '@/components/BagRevealStorySection';
import StickyProductSection from '@/components/StickyProductSection';
import SnapStorySection from '@/components/SnapStorySection';
import BrandStorySection from '@/components/BrandStorySection';
import CertificationSection from '@/components/CertificationSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      {/* Fixed-layer effects (z-0) */}
      <AnimatedBackground />
      <FloatingParticles />
      <ScrollIndicator />

      {/* Page content (z-10+) */}
      <main className="relative z-10">
        <Navbar />
        <HeroSection />
        <BagRevealStorySection />
       

        <BrandStorySection />
        <SnapStorySection />
         <StickyProductSection />
        <CertificationSection />
        <TestimonialSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
