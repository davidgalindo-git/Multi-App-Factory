import createMDX from 'fumadocs-mdx/config';
import fs from 'node:fs';
import path from 'node:path';

function extractAppConfigValue() {
  const appConfigPath = path.resolve('src/config/app-config.ts');
  const raw = fs.readFileSync(appConfigPath, 'utf8');

  // Keep this regex aligned with `src/config/app-config.ts` formatting.
  const match = raw.match(/metadata:\s*\{[\s\S]*?name:\s*['"]([^'"]+)['"]/);
  return match?.[1] ?? '[APP_NAME]';
}

function createAppConfigRemarkPlugin(appName) {
  return function appConfigPlaceholders() {
    return function transform(tree) {
      const walk = (node) => {
        if (node && node.type === 'text' && typeof node.value === 'string') {
          node.value = node.value
            .replaceAll('{{APP_NAME}}', appName)
            .replaceAll('[APP_NAME]', appName)
            .replaceAll('{{APP_AUTHOR}}', appName)
            .replaceAll('[APP_AUTHOR]', appName);
        }
        if (node && Array.isArray(node.children)) {
          for (const child of node.children) walk(child);
        }
      };
      walk(tree);
    };
  };
}

const appName = extractAppConfigValue();

const withMDX = createMDX({
  mdxOptions: {
    remarkPlugins: [createAppConfigRemarkPlugin(appName)]
  }
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: ''
      },
      {
        protocol: 'http', 
        hostname: '127.0.0.1', 
        port: '64321'
      },
      {
        protocol: 'https',
        hostname: 'llmgwifgtszjgjlzlwjq.supabase.co',
        port: ''
      }
    ]
  }
};

export default withMDX(config);
