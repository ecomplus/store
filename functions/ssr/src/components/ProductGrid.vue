<template>
  <section class="ui-section">
    <div v-if="title" class="mx-auto mb-2 max-w-prose text-center">
      <h2 class="ui-text-brand text-3xl">
        <ALink :href="titleLink" :class="titleLink ? 'ui-link' : 'text-base-700'">
          {{ title }}
        </ALink>
      </h2>
    </div>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li v-for="product in products" :key="product._id">
        <ProductCard :product="product" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import {
  type Props as UseProductShelfProps,
  useProductShelf,
} from '@@sf/composables/use-product-shelf';
import ProductCard from '~/components/ProductCard.vue';

export interface Props extends UseProductShelfProps {}

const props = defineProps<Props>();
const {
  title,
  titleLink,
  fetching,
  products,
} = useProductShelf(props);
if (import.meta.env.SSR) {
  await fetching;
}
</script>
