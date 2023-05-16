import '@cloudcommerce/firebase/lib/init';
import config from '@cloudcommerce/firebase/config';
import mergeConfig from './config.json' assert { type: 'json' };

config.set({
  ...mergeConfig,
  hello: 'from store',
});

export * from '@cloudcommerce/modules/firebase';

export * from '@cloudcommerce/events/firebase';
