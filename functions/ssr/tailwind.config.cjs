process.env.STOREFRONT_BASE_DIR = __dirname;

// eslint-disable-next-line import/no-extraneous-dependencies
const defaultConfig = require('@cloudcommerce/storefront/tailwind.config.cjs');

const themeOptions = {
  // generalIcons: 'tabler',
};
const genTailwindConfig = () => defaultConfig.genTailwindConfig(themeOptions);

module.exports = {
  ...genTailwindConfig(),
  themeOptions,
};
