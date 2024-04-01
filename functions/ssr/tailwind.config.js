process.env.STOREFRONT_BASE_DIR = __dirname;

// eslint-disable-next-line import/first
import { genTailwindConfig } from '@cloudcommerce/storefront/config/storefront.tailwind.mjs';

const themeOptions = {
  // baseColor: 'zinc',
  // generalIconSets: ['tabler'],
};

export default {
  ...genTailwindConfig(themeOptions),
  themeOptions,
};
