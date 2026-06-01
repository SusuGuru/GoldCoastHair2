import PageLayout from '@/components/feature/PageLayout';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import NewArrivalsSection from './components/NewArrivalsSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import InstagramStrip from '@/components/feature/InstagramStrip';
import WhatsAppBar from '@/components/feature/WhatsAppBar';


export default function HomePage() {
  return (
    <PageLayout>
      <div className="-mt-40 md:-mt-36">
        <HeroSection />
      </div>
      <AboutSection />
      <NewArrivalsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <InstagramStrip />
      <ContactSection />
      <WhatsAppBar />
    </PageLayout>
  );
}