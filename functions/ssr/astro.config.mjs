import { basename } from 'node:path';
import { defineConfig } from 'astro/config';
import { astroConfig } from '@cloudcommerce/storefront/astro.config.mjs';

astroConfig.devToolbar = { enabled: false };

const buildConfig = astroConfig.build;
astroConfig.vite.build = {
  rollupOptions: {
    output: {
      chunkFileNames: `${buildConfig.assets}/[name].[hash].js`,
      assetFileNames: `${buildConfig.assets}/[name].[hash][extname]`,
      entryFileNames: (chunkInfo) => {
        if (chunkInfo.name.includes('hoisted')) {
          const sfScripts = chunkInfo.moduleIds?.filter((id) => {
            return id.includes('storefront/src/lib/scripts/');
          });
          if (sfScripts?.length === 1) {
            const scriptName = basename(sfScripts[0], '.ts').replaceAll('.', '');
            return `${buildConfig.assets}/[name]-${scriptName}.[hash].js`;
          }
        }
        return `${buildConfig.assets}/[name].[hash].js`;
      },
    },
  },
};

export default defineConfig(astroConfig);
