<template>
  <div v-if="isFetching" class="ui-section relative min-h-[300px]">
    <Skeleton class="absolute top-0 w-full" is-bold is-large />
  </div>
  <Fade :is-leave-to="false">
    <ProductGrid :products="products" />
  </Fade>
</template>

<script setup lang="ts">
import {
  useSearchContainer,
  type Props as UseSearchContainerProps,
} from '@@sf/composables/use-search-container';
import ProductGrid from '~/components/ProductGrid.vue';

export interface Props extends UseSearchContainerProps {}

const props = defineProps<Props>();
const {
  // searchEngine,
  fetching,
  isFetching,
  products,
} = useSearchContainer(props);
if (import.meta.env.SSR) {
  await fetching;
}
</script>
