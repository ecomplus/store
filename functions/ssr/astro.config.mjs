import { basename } from 'node:path';
import { defineConfig } from 'astro/config';
import { astroConfig } from '@cloudcommerce/storefront/astro.config.mjs';

astroConfig.devToolbar = { enabled: false };

astroConfig.vite.build = {
  rollupOptions: {
    output: {
      chunkFileNames: `_astro/[name].[hash].js`,
      assetFileNames: `_astro/[name].[hash][extname]`,
      entryFileNames: (chunkInfo) => {
        if (chunkInfo.name.includes('hoisted')) {
          const sfScripts = chunkInfo.moduleIds?.filter((id) => {
            return id.includes('storefront/src/lib/scripts/');
          });
          if (sfScripts?.length === 1) {
            const scriptName = basename(sfScripts[0], '.ts').replaceAll('.', '');
            return `_astro/[name]-${scriptName}.[hash].js`;
          }
        }
        return `_astro/[name].[hash].js`;
      },
    },
  },
};

export default defineConfig(astroConfig);
