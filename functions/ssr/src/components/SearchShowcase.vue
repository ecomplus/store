<template>
  <div v-if="isFetching" class="ui-section relative min-h-[300px]">
    <Skeleton class="absolute top-0 w-full" is-bold is-large />
  </div>
  <Fade :is-leave-to="false">
    <ProductShelf :products="products" is-grid />
  </Fade>
</template>

<script setup lang="ts">
import {
  useSearchShowcase,
  type Props as UseSearchShowcaseProps,
} from '@@sf/composables/use-search-showcase';
import ProductShelf from '~/components/ProductShelf.vue';

export interface Props extends UseSearchShowcaseProps {}

const props = defineProps<Props>();
const {
  // searchEngine,
  fetching,
  isFetching,
  products,
} = useSearchShowcase(props);
if (import.meta.env.SSR) {
  await fetching;
}
</script>
