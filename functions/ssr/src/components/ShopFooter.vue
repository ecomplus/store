<template>
  <footer class="bg-base-50 border-base-100 w-screen border-t py-2">
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
          <div v-if="$settings.address || $settings.phone" class="text-base-700 mt-3">
            <address v-if="$settings.address" class="mr-4 inline-block">
              {{ $settings.address }}
            </address>
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
              <ALink :href="`/${slug}`" class="ui-link text-base-600">
                {{ name }}
              </ALink>
            </li>
            <li>
              <ALink href="/s" class="ui-link text-base-900">
                {{ $t.i19allProducts }}
              </ALink>
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
    <div class="ui-section">
      <div class="flex flex-wrap items-start justify-between gap-5 lg:flex-nowrap">
        <ul class="mx-auto flex items-center gap-x-6 gap-y-3
          overflow-x-auto md:mx-0 md:flex-wrap md:overflow-hidden lg:gap-x-8">
          <li v-for="(stamp, i) in stamps" :key="i">
            <ALink :href="stamp.href?.replace('{domain}', $settings.domain || '')">
              <slot :name="`picture-${i}`" />
              <span v-if="!stamp.img" class="flex items-center">
                <span
                  v-if="stamp.icon"
                  class="[&>*]:from-success-200 [&>*]:to-success-700
                  mr-2 text-4xl [&>*]:bg-gradient-to-br"
                >
                  <i v-if="stamp.icon === 'lock'" class="i-lock-closed"></i>
                  <i v-else-if="stamp.icon === 'check'" class="i-check-badge"></i>
                  <i v-else class="i-arrow-path-rounded-square"></i>
                </span>
                <span class="text-base-600 max-w-[140px] text-sm font-medium">
                  {{ stamp.alt }}
                  <i
                    v-if="stamp.href && stamp.href.charAt(0) !== '/'"
                    class="bg-base-400 i-arrow-top-right-on-square ml-0.5"
                  ></i>
                </span>
              </span>
            </ALink>
          </li>
        </ul>
        <div class="mx-auto flex flex-wrap items-center justify-end
          gap-4 overflow-x-auto text-2xl md:mx-0 md:flex-nowrap md:overflow-hidden">
          <PaymentMethodFlag
            v-for="paymentMethod in $settings.payment_methods"
            :key="paymentMethod"
            :flag="paymentMethod"
          />
        </div>
      </div>
      <div class="mt-7 justify-between gap-4
        text-center text-xs md:flex md:text-left">
        <div class="mb-3 md:mb-0">
          @ {{ new Date().getFullYear() }} {{ $settings.corporate_name }}
          {{ $settings.address ? `/ ${$settings.address}` : '' }}
          / {{ $settings.doc_number }}
        </div>
        <ALink href="https://www.ecomplus.io/" class="italic text-[#37003c]">
          powered by <b>E-Com Plus</b>
        </ALink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Categories } from '@cloudcommerce/api/types';
import type { LayoutContent } from '@@sf/content';
import { socialNetworks } from '@@sf/sf-lib';
import SocialNetworkLink from '@@sf/components/SocialNetworkLink.vue';
import PaymentMethodFlag from '@@sf/components/PaymentMethodFlag.vue';

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
