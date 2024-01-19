process.env.STOREFRONT_BASE_DIR = './functions/ssr';

const { genTailwindConfig } = require('./functions/ssr/tailwind.config.cjs');

module.exports = genTailwindConfig();
