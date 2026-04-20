import { Hero } from '../components/home/Hero';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { TrustStats } from '../components/home/TrustStats';
import { CTASection } from '../components/home/CTASection';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <main className="overflow-hidden">
      <Hero onNavigate={onNavigate} />
      <FeaturesSection />
      <TrustStats />
      <CTASection onNavigate={onNavigate} />
    </main>
  );
}
