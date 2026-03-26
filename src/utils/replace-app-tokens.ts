import { APP_CONFIG } from '@/config/app-config';

export function replaceAppTokens(input: string): string {
  const appName = APP_CONFIG.metadata.name;
  return input
    .replaceAll('[APP_NAME]', appName)
    .replaceAll('{{APP_NAME}}', appName)
    .replaceAll('[APP_AUTHOR]', appName)
    .replaceAll('{{APP_AUTHOR}}', appName);
}

