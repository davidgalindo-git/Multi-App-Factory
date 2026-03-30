'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Particles from '@/components/magicui/particles';
import Ripple from '@/components/magicui/ripple';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { APP_CONFIG } from '@/config/app-config';
import { applyAppTemplate } from '@/src/utils/app-template';

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0"
          quantity={300}
          ease={80}
          color={theme === 'dark' ? '#FFFFFF' : '#000000'}
          refresh
        />
        <Ripple />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-32">
        <div className="relative z-10 flex max-w-[64rem] flex-col items-center gap-6 text-center mx-auto">
          <div
            className={cn(
              'rounded-full border bg-card/60 text-base text-secondary px-4 py-2 backdrop-blur-sm',
              'text-foreground/80'
            )}
          >
            {APP_CONFIG.metadata.description}
          </div>

          <h1 className="font-heading tracking-tight font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              {applyAppTemplate(APP_CONFIG.content.heroTitle, {
                APP_NAME: APP_CONFIG.metadata.name
              })}
            </span>
          </h1>

          <p className="max-w-[42rem] text-primary sm:text-xl sm:leading-8">
            {APP_CONFIG.content.heroSubtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: 'xl' }),
                'rounded-full'
              )}
            >
              {APP_CONFIG.content.heroCtaText}
            </Link>
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'xl' }),
                'rounded-full border-secondary text-secondary hover:text-secondary'
              )}
            >
              {APP_CONFIG.content.secondaryCtaText}{" "}
              <ArrowRightIcon className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

