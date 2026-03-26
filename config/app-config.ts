import { APP_CONFIG as MASTER } from '../src/config/app-config';
import { APP_CONFIG as TEST } from '../src/config/test-neon-face';

// IMPORTANT:
// This toggle must ALWAYS be set to `false` before any production deployment.
// It exists only for local testing / identity hot-swapping.
const USE_TEST_CONFIG = true;

export const APP_CONFIG = USE_TEST_CONFIG ? TEST : MASTER;
export type { AppConfig } from '../src/config/app-config';

