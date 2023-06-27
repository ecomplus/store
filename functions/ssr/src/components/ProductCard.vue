<template>
  <article
    ref="card"
    :data-sku="product.sku"
    class="relative h-full max-w-[350px] mx-auto py-3 group"
  >
    <component
      :is="link ? 'ALink' : 'span'"
      :href="link"
      class="flex flex-col h-full rounded overflow-hidden
      group-hover:shadow group-hover:ring-1 ring-black/5"
    >
      <div class="aspect-square p-2
        motion-safe:group-hover:scale-110 transition-transform">
        <div class="relative w-full h-full bg-white rounded overflow-hidden
          group-hover:rounded-none">
          <template v-if="images?.length">
            <AImg
              :picture="images[0]"
              class="absolute top-0 left-0 block w-full h-full object-cover"
            />
            <AImg
              v-if="images[1] && wasHoveredOnce"
              :picture="images[1]"
              class="absolute top-0 left-0 block w-full h-full object-cover
              opacity-0 group-hover:opacity-100 transition-opacity
              motion-safe:duration-300 text-transparent z-10"
            />
          </template>
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-base-50/20 to-base-100"
          />
        </div>
      </div>
      <div class="flex flex-col grow justify-between p-4
        group-hover:backdrop-blur-md bg-white/40 z-10">
        <component
          :is="headingTag"
          class="ui-link text-base-700 no-underline line-clamp-2"
          :class="link ? 'group-hover:underline group-hover:text-primary' : null"
        >
          {{ title }}
        </component>
        <div class="pt-2">
          <Prices :product="product" />
        </div>
      </div>
    </component>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { watchOnce, useElementHover } from '@vueuse/core';
import {
  type Props as UseProductCardProps,
  useProductCard,
} from '@@sf/composables/use-product-card';
import Prices from '~/components/Prices.vue';

export type Props = UseProductCardProps & {
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const props = withDefaults(defineProps<Props>(), {
  headingTag: 'h3',
});
const {
  product,
  title,
  link,
  images,
} = useProductCard({
  product: props.product,
  productId: props.productId,
} as UseProductCardProps);
const card = ref<HTMLElement | null>(null);
const isHovered = useElementHover(card);
const wasHoveredOnce = ref(false);
watchOnce(isHovered, () => {
  wasHoveredOnce.value = true;
});
</script>
