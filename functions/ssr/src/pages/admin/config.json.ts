import type { CmsConfigExtend } from '@@sf/content';
import { cmsFields as heroFields } from '~/sections/Hero.astro';
import { cmsFields as bannersGridFields } from '~/sections/BannersGridSection.astro';
import { cmsFields as pageTitleFields } from '~/sections/PageTitleSection.astro';
import { cmsFields as productShelfFields } from '~/sections/ProductShelfSection.astro';
import { cmsFields as searchShowcaseFields } from '~/sections/SearchShowcaseSection.astro';
import { cmsFields as contentEntryFields } from '~/sections/ContentEntrySection.astro';
import { cmsFields as customHtmlFields } from '~/sections/CustomHtmlSection.astro';
import { cmsFields as productDetailsFields } from '~/sections/ProductDetailsSection.astro';

export async function GET() {
  const cmsConfig: CmsConfigExtend = {
    components: {
      hero: {
        label: 'Hero slider',
        fields: heroFields,
      },
      sections: {
        'banners-grid': {
          label: 'Grade de banners',
          fields: bannersGridFields,
        },
        'page-title': {
          label: 'Título da página (SEO)',
          fields: pageTitleFields,
        },
        'product-shelf': {
          label: 'Estante de produtos',
          fields: productShelfFields,
        },
        'search-showcase': {
          label: 'Vitrine de produtos e busca',
          fields: searchShowcaseFields,
        },
        /*
        'c:foo': {
          label: 'Bar',
        },
        'c:foo-with-fields': {
          label: 'Bar with fields',
          fields: fooBarFields,
        },
        */
        'content-entry': {
          label: 'Bloco de conteúdo',
          fields: contentEntryFields,
        },
        'custom-html': {
          label: 'HTML customizado',
          fields: customHtmlFields,
        },
        breadcrumbs: {
          label: 'Breadcrumbs',
        },
        'product-details': {
          label: 'Detalhes do produto',
          fields: productDetailsFields,
        },
        'related-products': {
          label: 'Produtos relacionados',
        },
        'context-showcase': {
          label: 'Vitrine da página',
          fields: searchShowcaseFields,
        },
        'doc-banners': {
          label: 'Banners da categoria/marca',
        },
        'doc-description': {
          label: 'Descrição da categoria/marca',
        },
      },
    },
    settingsMetafields: {
    },
    headerCustom: {
    },
    footerCustom: {
    },
  };
  return new Response(JSON.stringify(cmsConfig));
}
