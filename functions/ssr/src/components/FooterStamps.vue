<template>
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
          v-for="paymentMethod in $settings.paymentMethods"
          :key="paymentMethod"
          :flag="paymentMethod"
        />
      </div>
    </div>
    <div class="mt-7 justify-between gap-4
      text-center text-xs md:flex md:text-left">
      <div class="mb-3 md:mb-0">
        @ {{ new Date().getFullYear() }} {{ $settings.corporateName }}
        {{ $settings.address ? `/ ${$settings.address}` : '' }}
        / {{ $settings.docNumber }}
      </div>
      <ALink href="https://www.ecomplus.io/" class="italic text-[#37003c]">
        powered by <b>e-com.plus</b>
      </ALink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LayoutContent } from '@@sf/content';
import PaymentMethodFlag from '@@sf/components/PaymentMethodFlag.vue';

export interface Props {
  stamps?: LayoutContent['footer']['stamps'];
}

defineProps<Props>();
</script>
