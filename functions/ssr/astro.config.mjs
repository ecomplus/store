import { defineConfig } from 'astro/config';
import { astroConfig } from '@cloudcommerce/storefront/astro.config.mjs';

astroConfig.devToolbar = { enabled: false };

export default defineConfig(astroConfig);
