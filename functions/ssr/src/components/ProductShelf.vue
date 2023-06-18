<template>
  <section>
    <ul>
      <li v-for="product in products" :key="product._id">
        {{ product.name }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import {
  type Props as UseProductShelfProps,
  useProductShelf,
} from '@@sf/composables/use-product-shelf';

export interface Props extends UseProductShelfProps {}

const props = defineProps<Props>();
const { fetching, products } = useProductShelf(props);
if (import.meta.env.SSR) {
  await fetching.value;
}
</script>
