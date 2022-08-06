import config from '@cloudcommerce/firebase/config';
import mergeConfig from './config.json' assert { type: 'json' };

config.set({
  ...mergeConfig,
  hello: 'from store',
});

export * from '@cloudcommerce/events/firebase';
