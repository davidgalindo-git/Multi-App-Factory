'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Database,
  LayoutDashboard,
  Lock,
  ShieldCheck,
  Zap
} from 'lucide-react';

const cleanFeatures = [
  {
    icon: ShieldCheck,
    title: 'Authentication',
    description: 'Supabase-powered sign-in with protected dashboard routes.'
  },
  {
    icon: CreditCard,
    title: 'Subscriptions',
    description: 'Stripe Checkout + webhooks with a working subscription model.'
  },
  {
    icon: Database,
    title: 'Postgres Data Layer',
    description: 'RLS-enabled tables for customers, products, prices, and access.'
  },
  {
    icon: Lock,
    title: 'Secure API',
    description: 'Middleware + TRPC routes designed for safe, server-side data access.'
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard UI',
    description: 'A clean, responsive dashboard surface ready for your product.'
  },
  {
    icon: Zap,
    title: 'Next.js Chassis',
    description: 'Production-ready App Router structure you can prompt into anything.'
  }
];

export default function FeaturesHover() {
  return (
    <section
      id="features"
      className="container space-y-6 bg-zinc-50 py-8 dark:bg-zinc-900 md:py-12 lg:py-24 rounded-6xl mb-10"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          A clean SaaS starter that preserves the core chassis: auth, subscriptions,
          and server-side APIs. Replace the marketing and product UI in minutes.
        </p>
      </div>
      <div className="mx-auto grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 md:max-w-[64rem]">
        {cleanFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', bounce: 0.7 }}
            key={feature.title}
            className="relative overflow-hidden rounded-lg border bg-background dark:bg-zinc-950 p-6"
          >
            <Icon className="h-12 w-12 text-primary mb-4" />
              <div className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                {feature.title}
              </div>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-500">
                {feature.description}
              </div>
          </motion.div>
          );
        })}
      </div>
    </section>
  );
}
