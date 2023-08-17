<template>
  <section class="ui-section">
    <div v-if="title" class="max-w-prose mx-auto text-center mb-2">
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
        class="basis-1/2 md:basis-1/3 lg:basis-1/4 shrink-0"
      >
        <ProductCard :product="product" />
      </li>
      <template #controls>
        <div
          v-show="products.length > 2"
          class="text-3xl lg:text-2xl leading-none text-primary
          lg:opacity-0 group-hover/shelf:opacity-90 transition-opacity"
        >
          <CarouselControl class="!top-1/2 !-left-4 w-12 h-12
            bg-transparent lg:bg-white/80 lg:hover:bg-primary-300/60 rounded-full
            lg:shadow-sm lg:ring-1 ring-black/5" is-prev />
          <CarouselControl class="!top-1/2 !-right-4 w-12 h-12
            bg-transparent lg:bg-white/80 lg:hover:bg-primary-300/60 rounded-full
            lg:shadow-sm lg:ring-1 ring-black/5" />
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
import Carousel from '@@sf/components/Carousel.vue';
import CarouselControl from '@@sf/components/CarouselControl.vue';
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
