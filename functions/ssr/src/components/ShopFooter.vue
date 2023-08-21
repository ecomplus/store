<template>
  <footer class="w-screen bg-base-50 border-t border-base-100 py-2">
    <div class="ui-section">
      <div class="pb-7 border-b border-base-200 flex">
        <div class="text-base">
          <slot name="logo" />
          <p class="my-3">
            {{ $settings.description }}
          </p>
          <div class="flex gap-2 text-base-500">
            <span v-for="(href, network) in socialNetworks" :key="network">
              <SocialNetworkLink :network="network" class="p-1 hover:text-primary" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="ui-section">
      <div class="flex justify-between items-start gap-5">
        <ul class="flex flex-wrap gap-y-3 gap-x-6 lg:gap-x-8">
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
          gap-4 text-3xl md:text-2xl">
          <PaymentMethodFlag
            v-for="paymentMethod in $settings.payment_methods"
            :key="paymentMethod"
            :flag="paymentMethod"
          />
        </div>
      </div>
      <div class="mt-6 text-xs text-center md:text-left
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
import type { LayoutContent } from '@@sf/content';
import { socialNetworks } from '@@sf/sf-lib';
import SocialNetworkLink from '@@sf/components/SocialNetworkLink.vue';
import PaymentMethodFlag from '@@sf/components/PaymentMethodFlag.vue';

export interface Props {
  stamps?: LayoutContent['footer']['stamps'];
}

defineProps<Props>();
</script>
