import { join as joinPath } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
process.env.STOREFRONT_BASE_DIR = joinPath(__dirname, './functions/ssr');

// eslint-disable-next-line import/first, import/no-relative-packages
import tailwindConfig from './functions/ssr/tailwind.config.js';

export default tailwindConfig;
