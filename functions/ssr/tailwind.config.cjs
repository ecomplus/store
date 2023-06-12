process.env.STOREFRONT_BASE_DIR = __dirname;

// eslint-disable-next-line import/no-extraneous-dependencies
const { genTailwindConfig } = require('@cloudcommerce/storefront/config/storefront.tailwind.cjs');

const themeOptions = {
  // generalIcons: 'tabler',
};

module.exports = {
  ...genTailwindConfig(themeOptions),
  themeOptions,
};
