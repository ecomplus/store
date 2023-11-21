<template>
  <section class="ui-section">
    <div v-if="title" class="mx-auto mb-2 max-w-prose text-center">
      <h2 class="ui-text-brand text-3xl">
        <ALink :href="titleLink" :class="titleLink ? 'ui-link' : 'text-base-700'">
          {{ title }}
        </ALink>
      </h2>
    </div>
    <Carousel class="group/shelf">
      <li
        v-for="product in products"
        :key="product._id"
        class="shrink-0 basis-1/2 md:basis-1/3 lg:basis-1/4"
      >
        <ProductCard :product="product" :list-name="listName" />
      </li>
      <template #controls>
        <div
          v-show="products.length > 2"
          class="text-primary text-3xl leading-none transition-opacity
          group-hover/shelf:opacity-90 lg:text-2xl lg:opacity-0"
        >
          <CarouselControl class="lg:hover:bg-primary-300/60 !-left-4 !top-1/2
            h-12 w-12 rounded-full bg-transparent ring-black/5
            lg:bg-white/80 lg:shadow-sm lg:ring-1" is-prev />
          <CarouselControl class="lg:hover:bg-primary-300/60 !-right-4 !top-1/2
            h-12 w-12 rounded-full bg-transparent ring-black/5
            lg:bg-white/80 lg:shadow-sm lg:ring-1" />
        </div>
      </template>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
import {
  type Props as UseProductShelfProps,
  useProductShelf,
} from '@@sf/composables/use-product-shelf';
import { useId } from '@@sf/sf-lib';
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
const listName = title.value || `Shelf ${useId()}`;
</script>
