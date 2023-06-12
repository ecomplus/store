// eslint-disable-next-line import/no-extraneous-dependencies
const { genUnoCSSConfig } = require('@cloudcommerce/storefront/config/storefront.unocss.cjs');
const tailwindConfig = require('./tailwind.config.cjs');

export default genUnoCSSConfig(tailwindConfig);
