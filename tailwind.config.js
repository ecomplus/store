import { join as joinPath } from 'node:path';

process.env.STOREFRONT_BASE_DIR = joinPath(__dirname, './functions/ssr');

// eslint-disable-next-line import/first, import/no-relative-packages
import tailwindConfig from './functions/ssr/tailwind.config.js';

export default tailwindConfig;
