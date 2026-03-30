'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { APP_CONFIG } from '@/config/app-config';
import { LucideIcon } from '@/src/components/lucide-icon';

export default function FeaturesHover() {
  return (
    <section
      id="features"
      className="container space-y-6 bg-secondary/5 py-8 md:py-12 lg:py-24 rounded-6xl mb-10 border"
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
        {APP_CONFIG.content.features.map((feature) => {
          return (
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', bounce: 0.7 }}
              key={feature.title}
              className="relative overflow-hidden rounded-lg border bg-card/60 p-6 backdrop-blur-sm"
            >
              <LucideIcon
                iconName={feature.iconName}
                className="h-12 w-12 text-secondary mb-4"
              />
              <div className="mb-2 text-lg font-medium text-foreground">
                {feature.title}
              </div>
              <div className="text-sm font-normal text-muted-foreground">
                {feature.desc}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
