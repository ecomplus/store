<template>
  <details class="[&_i]:open:rotate-180">
    <summary role="button" class="text-base-700 hover:text-base-800
      [&>i]:hover:text-primary my-4 list-none text-2xl
      font-medium lowercase md:my-5">
      <i class="i-chevron-down mr-1"></i>
      <span>{{ title }}</span>
    </summary>
    <slot />
  </details>
</template>

<script setup lang="ts">
export interface Props {
  title: string;
}

defineProps<Props>();
</script>
