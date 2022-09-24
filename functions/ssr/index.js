import config from '@cloudcommerce/firebase/config';
// eslint-disable-next-line import/no-unresolved, import/no-relative-packages
import { handler as ssrHandler } from './storefront/dist/server/entry.mjs';
import mergeConfig from './config.json' assert { type: 'json' };

config.set({
  ...mergeConfig,
  hello: 'from store',
  /*
  httpsFunctionOptions: {
    minInstances: 1,
  },
  */
});

process.env.STOREFRONT_BASE_DIR = './storefront';
global.ssr_handler = ssrHandler;

export * from '@cloudcommerce/ssr/firebase';
