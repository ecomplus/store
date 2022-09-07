import config from '@cloudcommerce/firebase/config';
import { handler as ssrHandler } from './dist/server/entry.mjs';
import mergeConfig from './config.json' assert { type: 'json' };

config.set({
  ...mergeConfig,
  hello: 'from store',
});

global.ssr_handler = ssrHandler;

export * from '@cloudcommerce/ssr/firebase';
