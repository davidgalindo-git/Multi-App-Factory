import type { AppConfig } from './app-config';
import { testimonials } from '@/config/testimonials';
import { faqItems } from '@/config/faq';

/**
 * Mock config for testing identity + theming hot-swap.
 *
 * Toggle is controlled from `config/app-config.ts`.
 */
export const APP_CONFIG: AppConfig = {
  metadata: {
    name: 'NeonFace AI',
    title: 'NeonFace AI',
    description:
      'NeonFace AI generates cyberpunk-grade headshots with instant training and privacy-first processing.',
    url: 'https://neonface.ai',
    ogImage: 'https://neonface.ai/og.jpg'
  },
  branding: {
    logoIconName: 'Command',
    faviconPath: '/favicon.ico',
    showTestimonials: true,
    showFaqs: true
  },
  theming: {
    // Cyberpunk neon pink + teal accents.
    primaryColor: '#FF007F',
    secondaryColor: '#00F5FF',
    darkMode: true,
    borderRadius: '0.75rem'
  },
  content: {
    heroTitle: 'Turn portraits into neon-grade headshots with {{APP_NAME}}',
    heroSubtitle:
      'Ship a production-ready AI headshot SaaS: auth, subscriptions, and a full customer-ready chassis powered by Next.js + Supabase + Stripe.',
    heroCtaText: 'Launch Neon Studio',
    secondaryCtaText: 'View Plans',
    features: [
      {
        iconName: 'Sparkles',
        title: 'Neon Headshot Generation',
        desc: 'Cyberpunk aesthetics with instant preview and consistent results.'
      },
      {
        iconName: 'Camera',
        title: 'Upload & Validate',
        desc: 'Server-side validation pipeline to keep processing clean and reliable.'
      },
      {
        iconName: 'ShieldCheck',
        title: 'Privacy-First Processing',
        desc: 'RLS-enabled access boundaries and safe server-side orchestration.'
      },
      {
        iconName: 'CreditCard',
        title: 'Usage-Based Subscriptions',
        desc: 'Stripe Checkout + webhooks wired end-to-end for billing events.'
      },
      {
        iconName: 'Database',
        title: 'RLS Data Layer',
        desc: 'Customer-safe tables for processing jobs, results, and access.'
      },
      {
        iconName: 'Brain',
        title: 'AI Ops Ready',
        desc: 'A clean chassis designed for you to plug in model logic later.'
      }
    ],
    testimonials,
    faqs: faqItems
  },
  business: {
    legalName: 'NeonFace AI Inc.',
    contactEmail: 'contact@neonface.ai',
    socialLinks: {
      github: 'https://github.com/your-org/your-repo',
      twitter: 'https://twitter.com/neonface_ai',
      linkedin: 'https://www.linkedin.com/in/neonface-ai/'
    },
    supportEmail: 'support@neonface.ai',
    stripePriceIds: {
      free: '',
      pro: ''
    }
  }
};

