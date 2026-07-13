import { setRequestLocale } from 'next-intl/server';
import { SpotlightCursor } from '@/components/effects/SpotlightCursor';
import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FooterSection } from '@/components/sections/FooterSection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SpotlightCursor />
      <Navbar />
      <main className="noise-overlay">
        <HeroSection />
        <TimelineSection />
        <BentoGrid />
        <SocialProofSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
