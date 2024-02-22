const { join: joinPath } = require('node:path');

process.env.STOREFRONT_BASE_DIR = joinPath(__dirname, './functions/ssr');

const tailwindConfig = require('./functions/ssr/tailwind.config.cjs');

module.exports = tailwindConfig;
