import { Metadata } from 'next';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import type { Viewport } from 'next';
import { RootProvider } from 'fumadocs-ui/provider';
import { TRPCReactProvider } from '@/trpc/react';

import { APP_CONFIG } from '@/config/app-config';
import { hexToHslTriplet } from '@/src/utils/theme/hex-to-hsl';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
};

import '@/styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  // src: "../assets/fonts/NotoSansMono-VariableFont_wdth,wght.ttf",
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading'
});

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: {
    default: APP_CONFIG.metadata.title,
    template: `%s | ${APP_CONFIG.metadata.title}`
  },
  description: APP_CONFIG.metadata.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI'
  ],
  authors: [
    {
      name: APP_CONFIG.metadata.name,
      url: APP_CONFIG.metadata.url
    }
  ],
  creator: APP_CONFIG.metadata.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_CONFIG.metadata.url,
    title: APP_CONFIG.metadata.title,
    description: APP_CONFIG.metadata.description,
    siteName: APP_CONFIG.metadata.title
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.metadata.title,
    description: APP_CONFIG.metadata.description,
    images: [APP_CONFIG.metadata.ogImage],
    creator: '@your_twitter_handle'
  },
  icons: {
    icon: APP_CONFIG.branding.faviconPath,
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: `${APP_CONFIG.metadata.url}/site.webmanifest`
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const primary = hexToHslTriplet(APP_CONFIG.theming.primaryColor);
  const secondary = hexToHslTriplet(APP_CONFIG.theming.secondaryColor);
  const radius = APP_CONFIG.theming.borderRadius;

  const parseTriplet = (triplet: string) => {
    const [hRaw, sRaw, lRaw] = triplet.split(' ');
    const h = Number.parseFloat(hRaw);
    const s = Number.parseFloat((sRaw ?? '0').replace('%', ''));
    const l = Number.parseFloat((lRaw ?? '0').replace('%', ''));
    return { h, s, l };
  };

  const formatTriplet = (h: number, s: number, l: number) =>
    `${Math.round(h)} ${Math.max(0, Math.min(100, s)).toFixed(1).replace(/\.0$/, '')}% ${Math.max(0, Math.min(100, l)).toFixed(1).replace(/\.0$/, '')}%`;

  // Derive a cohesive dark palette from primary/secondary.
  const p = parseTriplet(primary);
  const s = parseTriplet(secondary);
  const darkBackground = formatTriplet(p.h, Math.min(25, p.s), 8);
  const darkCard = formatTriplet(p.h, Math.min(28, p.s), 12);
  const darkMuted = formatTriplet(p.h, Math.min(18, p.s), 16);
  const darkBorder = formatTriplet(p.h, Math.min(20, p.s), 18);
  const darkRing = formatTriplet(s.h, s.s, Math.max(55, s.l));

  const lightBackground = '0 0% 100%';
  const lightForeground = '240 10% 3.9%';
  const darkForeground = '0 0% 98%';

  const cssVars = `
:root{
  --primary:${primary};
  --secondary:${secondary};
  --accent:${secondary};
  --ring:${secondary};
  --radius:${radius};
  --background:${lightBackground};
  --foreground:${lightForeground};
}
.dark{
  --primary:${primary};
  --secondary:${secondary};
  --accent:${secondary};
  --ring:${darkRing};
  --radius:${radius};
  --background:${darkBackground};
  --foreground:${darkForeground};
  --card:${darkCard};
  --card-foreground:${darkForeground};
  --popover:${darkCard};
  --popover-foreground:${darkForeground};
  --muted:${darkMuted};
  --muted-foreground:240 5% 64.9%;
  --border:${darkBorder};
  --input:${darkBorder};
}
`;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: cssVars
          }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-mono antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={APP_CONFIG.theming.darkMode ? 'system' : 'light'}
          enableSystem={APP_CONFIG.theming.darkMode}
        >
          <RootProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </RootProvider>
          <Toaster />
          {/* <TailwindIndicator /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
