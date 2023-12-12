<template>
  <footer class="bg-base-50 border-base-100 mt-auto w-screen border-t py-2">
    <div class="ui-section">
      <div class="border-base-200 flex flex-wrap
        justify-between gap-y-5 border-b pb-7 sm:gap-x-10 lg:flex-nowrap">
        <div class="shrink">
          <slot name="logo" />
          <div v-if="$settings.description" class="prose">
            <p>{{ $settings.description }}</p>
          </div>
          <div class="text-base-500 flex gap-2">
            <span v-for="(href, network) in socialNetworks" :key="network">
              <SocialNetworkLink :network="network" class="hover:text-primary p-1">
                <template v-if="network === 'whatsapp'" #append>
                  <span class="text-base-600 ml-1 text-sm">
                    {{ $settings.whatsapp }}
                  </span>
                </template>
              </SocialNetworkLink>
            </span>
          </div>
          <div v-if="$settings.phone" class="text-base-700 mt-3">
            <ALink
              v-if="$settings.phone"
              :href="`tel:${$settings.phone.replace(/\D/g, '')}`"
              class="hover:text-primary"
            >
              <i class="i-phone mr-0.5"></i>
              {{ $settings.phone }}
            </ALink>
          </div>
        </div>
        <div v-if="categories?.length" class="basis-1/2 sm:basis-auto">
          <div class="mb-2.5 text-lg font-medium">
            {{ categoriesColTitle || $t.i19categories }}
          </div>
          <ul
            class="text-sm"
            :class="categories.length > 4
              ? 'grid md:grid-cols-2 gap-x-5 gap-y-1.5' : 'space-y-1.5'"
          >
            <li v-for="({ name, slug }, i) in categories" :key="`c-${i}`">
              <a :href="`/${slug}`" class="ui-link text-base-600">
                {{ name }}
              </a>
            </li>
            <li>
              <a href="/s" class="ui-link text-base-900">
                {{ $t.i19allProducts }}
              </a>
            </li>
          </ul>
        </div>
        <div v-if="pageLinks?.length" class="basis-1/2 sm:basis-auto">
          <div class="mb-2.5 text-lg font-medium">
            {{ pagesColTitle || $t.i19institutional }}
          </div>
          <ul
            class="text-sm"
            :class="pageLinks.length > 5
              ? 'grid md:grid-cols-2 gap-x-5 gap-y-1.5' : 'space-y-1.5'"
          >
            <li v-for="({ title, href }, i) in pageLinks" :key="`p-${i}`">
              <ALink :href="href" class="ui-link text-base-600">
                {{ title }}
              </ALink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <FooterStamps :stamps="stamps" />
  </footer>
</template>

<script setup lang="ts">
import type { Categories } from '@cloudcommerce/api/types';
import type { LayoutContent } from '@@sf/content';
import { socialNetworks } from '@@sf/sf-lib';
import SocialNetworkLink from '@@sf/components/SocialNetworkLink.vue';
import FooterStamps from '~/components/FooterStamps.vue';

export interface Props {
  stamps?: LayoutContent['footer']['stamps'];
  categories?: Array<Partial<Categories> & {
    name: string;
    slug: string;
  }>;
  categoriesColTitle?: string;
  pageLinks?: Array<{
    title: string;
    href: string;
  }>;
  pagesColTitle?: string;
}

defineProps<Props>();
</script>
