<template>
  <section class="ui-section">
    <div v-if="title" class="mx-auto mb-4 max-w-prose text-center">
      <h2 class="ui-text-brand text-3xl">
        <ALink :href="titleLink" :class="titleLink ? 'ui-link' : 'text-base-700'">
          {{ title }}
        </ALink>
      </h2>
    </div>
    <Component
      :is="isGrid ? 'ul' : 'Carousel'"
      class="group/shelf"
      :class="isGrid && 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'"
    >
      <li
        v-for="product in products"
        :key="product._id"
        class="shrink-0 basis-1/2 md:basis-1/3 lg:basis-1/4"
      >
        <ProductCard :product="product" :list-name="listName" />
      </li>
      <template v-if="!isGrid" #controls>
        <DefineCarouselControl v-slot="{ isPrev }">
          <CarouselControl
            v-show="products.length > 2"
            class=":uno: text-primary lg:hover:bg-primary-200 !top-1/2 h-12
            w-12 rounded-full bg-transparent text-3xl leading-none
            ring-black/5 backdrop-blur-md
            transition-opacity group-hover/shelf:opacity-90
            lg:bg-white/80 lg:text-2xl lg:opacity-0 lg:shadow-sm lg:ring-1"
            :class="isPrev ? '!-left-4' : '!-right-4'"
            :is-prev="isPrev"
          />
        </DefineCarouselControl>
        <ReuseCarouselControl :is-prev="true" />
        <ReuseCarouselControl />
      </template>
    </Component>
    <slot name="append" />
  </section>
</template>

<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core';
import {
  type Props as UseProductShelfProps,
  useProductShelf,
} from '@@sf/composables/use-product-shelf';
import { useId } from '@@sf/sf-lib';
import ProductCard from '~/components/ProductCard.vue';

export interface Props extends UseProductShelfProps {
  isGrid?: boolean;
}

const props = defineProps<Props>();
const [
  DefineCarouselControl,
  ReuseCarouselControl,
] = createReusableTemplate<{ isPrev?: boolean }>();
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
