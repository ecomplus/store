<template>
  <footer class="w-screen bg-base-50 border-t border-base-100 py-2">
    <div class="ui-section">
      <div class="pb-7 border-b border-base-200
        flex justify-between flex-wrap lg:flex-nowrap sm:gap-x-10 gap-y-5">
        <div class="shrink">
          <slot name="logo" />
          <div v-if="$settings.description" class="prose">
            <p>{{ $settings.description }}</p>
          </div>
          <div class="flex gap-2 text-base-500">
            <span v-for="(href, network) in socialNetworks" :key="network">
              <SocialNetworkLink :network="network" class="p-1 hover:text-primary">
                <template v-if="network === 'whatsapp'" #append>
                  <span class="ml-1 text-sm text-base-600">
                    {{ $settings.whatsapp }}
                  </span>
                </template>
              </SocialNetworkLink>
            </span>
          </div>
          <div v-if="$settings.address || $settings.phone" class="mt-3 text-base-700">
            <address v-if="$settings.address" class="inline-block mr-4">
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
          <div class="text-lg font-medium mb-2.5">
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
          <div class="text-lg font-medium mb-2.5">
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
      <div class="flex flex-wrap lg:flex-nowrap justify-between items-start gap-5">
        <ul class="flex gap-y-3 gap-x-6 lg:gap-x-8 items-center
          md:flex-wrap mx-auto md:mx-0 overflow-x-auto md:overflow-hidden">
          <li v-for="(stamp, i) in stamps" :key="i">
            <ALink :href="stamp.href?.replace('{domain}', $settings.domain || '')">
              <slot :name="`picture-${i}`" />
              <span v-if="!stamp.img" class="flex items-center">
                <span
                  v-if="stamp.icon"
                  class="text-4xl mr-2
                  [&>*]:bg-gradient-to-br [&>*]:from-success-200 [&>*]:to-success-700"
                >
                  <i v-if="stamp.icon === 'lock'" class="i-lock-closed"></i>
                  <i v-else-if="stamp.icon === 'check'" class="i-check-badge"></i>
                  <i v-else class="i-arrow-path-rounded-square"></i>
                </span>
                <span class="text-sm font-medium text-base-600 max-w-[140px]">
                  {{ stamp.alt }}
                  <i
                    v-if="stamp.href && stamp.href.charAt(0) !== '/'"
                    class="bg-base-400 ml-0.5 i-arrow-top-right-on-square"
                  ></i>
                </span>
              </span>
            </ALink>
          </li>
        </ul>
        <div class="flex flex-wrap md:flex-nowrap justify-end items-center
          gap-4 text-2xl mx-auto md:mx-0 overflow-x-auto md:overflow-hidden">
          <PaymentMethodFlag
            v-for="paymentMethod in $settings.payment_methods"
            :key="paymentMethod"
            :flag="paymentMethod"
          />
        </div>
      </div>
      <div class="mt-7 text-xs text-center md:text-left
        md:flex justify-between gap-4">
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
