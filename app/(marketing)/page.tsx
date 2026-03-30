import Testimonials from '@/components/landing-page/testimonials-default';
import FAQSection from '@/components/landing-page/faq';
import Hero from '@/components/landing-page/hero';
import LogoCloud from '@/components/landing-page/logo-cloud-svg';
import FeaturesHover from '@/components/landing-page/features-hover';
import Pricing from '@/components/pricing/pricing-primary';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/app-config';

export default async function IndexPage() {
  return (
      <div className="flex-col gap-10 mb-5">
        <Hero />
        <LogoCloud />
        <FeaturesHover />
        <Pricing />
          {APP_CONFIG.branding.showTestimonials ? <Testimonials /> : null}
        <section className="my-16">
          <div className="flex items-center w-full mb-8">
            <div className="flex flex-col items-center justify-center w-full">
              <h2 className="text-3xl font-bold">A clean SaaS chassis</h2>
              <p className="mt-2 text-muted-foreground max-w-xl text-center">
                Authentication + subscriptions + server-side APIs, ready for you
                to prompt into your product UI.
              </p>
              <Link href="/docs" className="mt-4 text-primary hover:underline">
                Read the docs <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
          {APP_CONFIG.branding.showFaqs ? <FAQSection /> : null}
    </div>
  );
}
