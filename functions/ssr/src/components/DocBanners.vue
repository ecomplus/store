<template>
  <section v-if="pictures.length" class="ui-section">
    <ul class="flex flex-wrap gap-4 lg:flex-nowrap">
      <li
        v-for="(picture, i) in pictures" :key="i"
        class="lg:flex-1 [&_img]:w-full [&_img]:object-cover"
      >
        <AImg :picture="picture" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Categories, Brands, Collections } from '@cloudcommerce/api/types';

export interface Props {
  apiDoc?: Partial<Categories | Brands | Collections>;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  apiDoc: () => globalThis.$storefront.apiContext?.doc as Categories,
});
const pictures = computed(() => props.apiDoc.pictures || []);
</script>
