<template>
  <details class="group my-4 md:my-5 [&_i]:open:-rotate-90">
    <summary role="button" class="text-base-700 hover:text-base-800
      [&>i]:hover:text-primary list-none text-2xl font-medium
      lowercase group-open:mb-3">
      <i class="i-chevron-right mr-1 rotate-90"></i>
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
