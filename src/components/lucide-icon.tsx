'use client';

import { icons as lucideIcons } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';

type LucideIconName = keyof typeof lucideIcons;

export function LucideIcon({
  iconName,
  className,
  ...props
}: {
  iconName: LucideIconName;
  className?: string;
} & LucideProps) {
  const Icon = lucideIcons[iconName] as unknown as ComponentType<
    LucideProps & { className?: string }
  >;

  // lucideIcons should always return a component for known iconName values.
  return <Icon className={className} {...props} />;
}

