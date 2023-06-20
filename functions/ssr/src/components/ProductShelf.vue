<template>
  <section>
    <h2 v-if="title">
      <ALink v-if="titleLink" :href="titleLink">
        {{ title }}
      </ALink>
      <template v-else>
        {{ title }}
      </template>
    </h2>
    <ul>
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
