/* eslint-disable import/prefer-default-export */
import { cmsFields as heroFields } from '~/sections/Hero.astro';
import { cmsFields as bannersGridFields } from '~/sections/BannersGrid.astro';

export async function GET() {
  return new Response(JSON.stringify({
    fields: {
      hero: heroFields,
      sections: {
        'banners-grid': bannersGridFields,
      },
    },
  }));
}
