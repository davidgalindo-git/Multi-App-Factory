import type { AppConfig } from './app-config';
import { testimonials } from '@/config/testimonials';
import { faqItems } from '@/config/faq';

/**
 * Mock config for testing identity + theming hot-swap.
 *
 * Service: BeanStream AI (Premium Coffee Subscription)
 */
export const APP_CONFIG: AppConfig = {
  metadata: {
    name: 'BeanStream AI',
    title: 'BeanStream AI',
    description:
      'Premium coffee subscriptions powered by AI curation: roast matching, delivery scheduling, and smart reorders.',
    url: 'https://beanstream.ai',
    ogImage: 'https://beanstream.ai/og.jpg'
  },
  branding: {
    logoIconName: 'Coffee',
    faviconPath: '/favicon.ico',
    showTestimonials: true,
    showFaqs: true
  },
  theming: {
    primaryColor: '#3e2723', // Deep Brown
    secondaryColor: '#d4af37', // Gold
    darkMode: true,
    borderRadius: '0.75rem'
  },
  content: {
    heroTitle: 'Stay stocked with premium coffee by {{APP_NAME}}',
    heroSubtitle:
      'BeanStream AI helps you keep your beans fresh with smart delivery schedules, roast recommendations, and subscription-ready billing.',
    heroCtaText: 'Start My Roast Profile',
    secondaryCtaText: 'Explore Subscription Plans',
    features: [
      {
        iconName: 'Coffee',
        title: 'Roast Matching',
        desc: 'AI-guided recommendations tuned to taste and consumption rhythm.'
      },
      {
        iconName: 'Truck',
        title: 'Reliable Delivery',
        desc: 'Shipping orchestration that keeps your subscription on track.'
      },
      {
        iconName: 'Calendar',
        title: 'Smart Scheduling',
        desc: 'Choose refill dates and get proactive reorder suggestions.'
      },
      {
        iconName: 'ShieldCheck',
        title: 'Subscription Trust',
        desc: 'RLS-friendly access patterns for customer data and ordering history.'
      },
      {
        iconName: 'CreditCard',
        title: 'Stripe Checkout Ready',
        desc: 'Billing flow designed for subscriptions, renewals, and webhooks.'
      },
      {
        iconName: 'Brain',
        title: 'AI Ops Ready',
        desc: 'A clean chassis so you can plug your AI pipeline in later.'
      }
    ],
    testimonials,
    faqs: faqItems
  },
  business: {
    contactEmail: 'hello@beanstream.ai',
    legalName: 'BeanStream AI, Inc.',
    supportEmail: 'support@beanstream.ai',
    socialLinks: {
      github: 'https://github.com/your-org/your-repo',
      twitter: 'https://twitter.com/beanstream_ai',
      linkedin: 'https://www.linkedin.com/in/beanstream-ai/'
    },
    stripePriceIds: {
      free: '',
      pro: ''
    }
  }
};

