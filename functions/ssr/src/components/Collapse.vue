<template>
  <details class="group my-4 md:my-5 [&>summary_i]:open:-rotate-90">
    <summary role="button" class="list-none text-2xl
      font-medium lowercase text-base-700 hover:text-base-800
      group-open:mb-3 [&>i]:hover:text-primary">
      <i class="mr-1 rotate-90 i-chevron-right"></i>
      <span>{{ title }}</span>
    </summary>
    <slot />
  </details>
</template>

<script setup lang="ts">
export type Props = {
  title: string;
}
defineProps<Props>();
</script>
