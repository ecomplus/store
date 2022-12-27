// eslint-disable-next-line import/no-extraneous-dependencies
const { genUnoCSSConfig } = require('@cloudcommerce/storefront/uno.config');
const { themeOptions } = require('./tailwind.config.cjs');

export default genUnoCSSConfig(themeOptions);
