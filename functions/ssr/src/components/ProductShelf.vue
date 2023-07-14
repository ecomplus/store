<template>
  <section class="container mx-auto">
    <h2 v-if="title">
      <ALink v-if="titleLink" :href="titleLink">
        {{ title }}
      </ALink>
      <template v-else>
        {{ title }}
      </template>
    </h2>
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
          class="text-3xl lg:text-xl leading-none text-primary
          lg:opacity-0 group-hover/shelf:opacity-90 transition-opacity"
        >
          <CarouselControl class="!top-1/2 lg:-left-2 w-10 h-10
            bg-transparent lg:bg-white/80 lg:hover:bg-primary/10 rounded-full
            lg:shadow-sm lg:ring-1 ring-black/5" is-prev />
          <CarouselControl class="!top-1/2 lg:-right-2 w-10 h-10
            bg-transparent lg:bg-white/80 lg:hover:bg-primary/10 rounded-full
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