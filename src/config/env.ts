/* eslint-disable */
// TypeScript bindings re-exporting from the single source of truth: src/config/env.js
// Used across Next.js app components, robots.ts, layout.tsx, and build scripts.

const envJs = require('./env.js');

export interface SeoMode {
  isIndexable: boolean;
  reason: string;
}

export const SITE_URL: string =
  typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'https://aarsika.com';

export const getSeoMode: () => SeoMode = envJs.getSeoMode;
export const logSeoMode: () => void = envJs.logSeoMode;
