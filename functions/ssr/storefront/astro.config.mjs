/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import { defineConfig } from 'astro/config';
import { astroConfig } from '@cloudcommerce/storefront/astro.config.mjs';

export default defineConfig({
  ...astroConfig,
  vite: {
    ...astroConfig.vite,
    envDir: '../',
  },
});
