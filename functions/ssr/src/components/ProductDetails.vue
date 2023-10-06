<template>
  <section class="ui-section flex flex-wrap
    gap-5 md:gap-4 lg:flex-nowrap 2xl:gap-6">
    <div class="w-full lg:basis-3/4">
      <template v-if="product.pictures?.length">
        <ImagesGallery :pictures="product.pictures" />
      </template>
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
