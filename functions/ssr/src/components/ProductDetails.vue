<template>
  <section class="ui-section grid grid-cols-1 gap-5
    md:gap-4 lg:grid-cols-4 2xl:gap-6">
    <div class="w-full lg:col-span-3">
      <template v-if="product.pictures?.length">
        <ImagesGallery :pictures="product.pictures" />
      </template>
      <slot name="description" />
    </div>
    <h1 class="ui-text-brand text-xl">
      {{ product.name }}
    </h1>
  </section>
</template>

<script setup lang="ts">
import type { Products } from '@cloudcommerce/api/types';
import ImagesGallery from '~/components/ImagesGallery.vue';

export interface Props {
  product?: Products;
}

withDefaults(defineProps<Props>(), {
  product: () => globalThis.$storefront.apiContext?.doc as Products,
});
</script>
