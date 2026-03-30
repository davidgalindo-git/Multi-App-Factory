import { testimonials } from '@/config/testimonials';
import { faqItems } from '@/config/faq';

// Keep the iconName values type-safe without pulling lucide runtime into the config.
type LucideIconName = keyof typeof import('lucide-react').icons;

export type AppConfig = Readonly<{
  metadata: Readonly<{
    name: string;
    title: string;
    description: string;
    url: string;
    ogImage: string;
  }>;
  branding: Readonly<{
    logoIconName: LucideIconName;
    faviconPath: string;
    showTestimonials: boolean;
    showFaqs: boolean;
  }>;
  theming: Readonly<{
    primaryColor: string; // hex
    secondaryColor: string; // hex
    darkMode: boolean;
    borderRadius: string;
  }>;
  content: Readonly<{
    heroTitle: string;
    heroSubtitle: string;
    heroCtaText: string;
    secondaryCtaText: string;
    features: ReadonlyArray<
      Readonly<{
        title: string;
        desc: string;
        iconName: LucideIconName;
      }>
    >;
    testimonials: typeof testimonials;
    faqs: typeof faqItems;
  }>;
  business: Readonly<{
    legalName: string;
    contactEmail: string;
    supportEmail: string;
    socialLinks: Readonly<{
      github?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    }>;
    stripePriceIds: Readonly<{
      free: string;
      pro: string;
    }>;
  }>;
}>;

export const APP_CONFIG: AppConfig = {
  metadata: {
    name: '[APP_NAME]',
    title: '[APP_NAME]',
    description: 'Your SaaS Tagline Here',
    url: 'https://yourdomain.com',
    ogImage: 'https://yourdomain.com/og.jpg'
  },
  branding: {
    logoIconName: 'Command',
    faviconPath: '/favicon.ico',
    showTestimonials: true,
    showFaqs: true
  },
  theming: {
    primaryColor: '#4f46e5',
    secondaryColor: '#06b6d4',
    darkMode: true,
    borderRadius: '0.5rem'
  },
  content: {
    heroTitle: 'Build a production-ready SaaS with {{APP_NAME}}',
    heroSubtitle:
      'Launch authentication, subscriptions, and core app pages with a proven Next.js + Supabase + Stripe chassis.',
    heroCtaText: 'Get Started',
    secondaryCtaText: 'View Pricing',
    features: [
      {
        iconName: 'ShieldCheck',
        title: 'Authentication',
        desc: 'Supabase-powered sign-in with protected dashboard routes.'
      },
      {
        iconName: 'CreditCard',
        title: 'Subscriptions',
        desc: 'Stripe Checkout + webhooks with a working subscription model.'
      },
      {
        iconName: 'Database',
        title: 'Postgres Data Layer',
        desc: 'RLS-enabled tables for customers, products, prices, and access.'
      },
      {
        iconName: 'Lock',
        title: 'Secure API',
        desc: 'Middleware + TRPC routes designed for safe, server-side data access.'
      },
      {
        iconName: 'LayoutDashboard',
        title: 'Dashboard UI',
        desc: 'A clean, responsive dashboard surface ready for your product.'
      },
      {
        iconName: 'Zap',
        title: 'Next.js Chassis',
        desc: 'Production-ready App Router structure you can prompt into anything.'
      }
    ],
    testimonials,
    faqs: faqItems
  },
  business: {
    legalName: '[APP_NAME] Inc.',
    contactEmail: 'hello@yourcompany.com',
    supportEmail: 'support@yourcompany.com',
    socialLinks: {
      github: 'https://github.com/your-org/your-repo',
      twitter: 'https://twitter.com/yourhandle',
      linkedin: 'https://www.linkedin.com/in/your-linkedin/',
      instagram: 'https://instagram.com/your-instagram'
    },
    stripePriceIds: {
      free: '',
      pro: ''
    }
  }
};

