<template>
  <section class="ui-section flex gap-6">
    <div class="basis-3/4">
      <template v-if="product.pictures?.length">
        <ImagesGallery :pictures="product.pictures" />
      </template>
    </div>
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
