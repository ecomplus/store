<template>
  <footer class="w-screen">
    <div class="container mx-auto">
      <div class="flex justify-between gap-4">
        <ul class="flex flex-wrap gap-4">
          <li v-for="(stamp, i) in stamps" :key="i">
            <ALink :href="stamp.href?.replace('{domain}', $settings.domain || '')">
              <slot :name="`picture-${i}`" />
              <span v-if="!stamp.img" class="flex items-center">
                <span
                  v-if="stamp.icon"
                  class="text-4xl text-success-400 mr-2"
                >
                  <i v-if="stamp.icon === 'lock'" class="i-lock-closed-20-solid"></i>
                  <i v-else class="i-check-badge-20-solid"></i>
                </span>
                <span class="text-sm font-medium text-base-600 max-w-[140px]">
                  {{ stamp.alt }}
                  <i v-if="stamp.href" class="ml-0.5 i-arrow-top-right-on-square"></i>
                </span>
              </span>
            </ALink>
          </li>
        </ul>
        <div class="flex flex-wrap items-center gap-3 text-2xl">
          <PaymentMethodFlag
            v-for="paymentMethod in $settings.payment_methods"
            :key="paymentMethod"
            :flag="paymentMethod"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { LayoutContent } from '@@sf/content';
import PaymentMethodFlag from '@@sf/components/PaymentMethodFlag.vue';

export interface Props {
  stamps?: LayoutContent['footer']['stamps'];
}

defineProps<Props>();
</script>
