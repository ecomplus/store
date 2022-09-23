import config from '@cloudcommerce/firebase/config';
// eslint-ignore-next-line import/no-unresolved
import { handler as ssrHandler } from './dist/server/entry.mjs';
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

global.ssr_handler = ssrHandler;

export * from '@cloudcommerce/ssr/firebase';
