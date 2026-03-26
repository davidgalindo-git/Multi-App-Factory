import { SubscriptionPlan } from 'types';
import { env } from '@/env.mjs';

export const freePlan: SubscriptionPlan = {
  name: 'Free',
  description:
    'The Free plan is limited to 3 projects. Upgrade to the PRO plan for unlimited projects.',
  stripe_price_id: ''
};

export const proPlan: SubscriptionPlan = {
  name: 'PRO',
  description: 'The PRO plan includes unlimited projects.',
  stripe_price_id: env.STRIPE_PRO_MONTHLY_PLAN_ID || ''
};
