<template>
  <footer class="w-screen">
    <ul class="flex flex-wrap gap-4 w-96">
      <li v-for="(stamp, i) in stamps" :key="i">
        <component
          :is="stamp.href ? 'a-link' : 'span'"
          :href="stamp.href?.replace('{domain}', $settings.domain || '')"
        >
          <slot :name="`picture-${i}`" />
          <span v-if="!stamp.img" class="flex items-center">
            <span v-if="stamp.icon" class="text-4xl text-success-400 mr-2">
              <i v-if="stamp.icon === 'lock'" class="i-lock-closed-20-solid"></i>
              <i v-else class="i-check-badge-20-solid"></i>
            </span>
            <span class="text-sm font-medium text-base-600 max-w-[140px]">
              {{ stamp.alt }}
              <i v-if="stamp.href" class="ml-0.5 i-arrow-top-right-on-square"></i>
            </span>
          </span>
        </component>
      </li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
import type { LayoutContent } from '@@sf/content';

export interface Props {
  serviceLinks?: LayoutContent['service_links'];
  stamps?: LayoutContent['footer']['stamps'];
  paymentMethods?: LayoutContent['footer']['payment_methods'];
}

defineProps<Props>();
</script>
