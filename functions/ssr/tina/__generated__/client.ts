import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'https://content.tinajs.io/1.4/content/e7693d37-1bca-4bc5-90c9-f5a7f7bad3e4/github/tinacms', token: '91299f5612f9d694f4d5c6e87497281a43dee97e', queries });
export default client;
  