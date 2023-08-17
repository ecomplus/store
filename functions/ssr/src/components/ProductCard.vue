<template>
  <article
    ref="card"
    :data-sku="product.sku"
    class="relative h-full max-w-[350px] mx-auto py-3 group"
  >
    <ALink
      :href="link"
      class="flex flex-col h-full rounded overflow-hidden
      group-hover:shadow group-hover:ring-1 ring-black/5"
    >
      <div class="aspect-square p-2
        motion-safe:group-hover:scale-110 transition-transform">
        <div class="relative w-full h-full bg-white rounded overflow-hidden
          group-hover:rounded-none">
          <span v-if="images?.length" class="text-xs text-opacity-70">
            <AImg
              :picture="images[0]"
              :alt="title"
              class="absolute top-0 left-0 block w-full h-full object-cover"
            />
            <AImg
              v-if="images[1] && wasHoveredOnce"
              :picture="images[1]"
              :alt="title"
              class="absolute top-0 left-0 block w-full h-full object-cover
              opacity-0 group-hover:opacity-100 transition-opacity
              motion-safe:duration-300 text-transparent z-10"
            />
          </span>
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-base-50/20 to-base-100"
          />
        </div>
      </div>
      <span
        v-if="discountPercentage"
        class=":uno: absolute top-9 right-2
        group-hover:scale-110 group-hover:translate-x-2 transition-transform
        bg-secondary/70 text-on-secondary text-xs
        py-0.5 pr-1.5 pl-3 [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]"
      >
        -<strong>{{ discountPercentage }}</strong>%
      </span>
      <div class="relative flex flex-col grow justify-between p-4
        group-hover:backdrop-blur-md bg-white/40 z-10">
        <component
          :is="headingTag"
          class="ui-link no-underline line-clamp-2"
          :class="[
            isActive ? 'text-base-700' : 'text-base-500',
            link ? 'group-hover:underline group-hover:text-primary' : null,
          ]"
        >
          {{ title }}
        </component>
        <div class="pt-2">
          <div v-if="isActive">
            <Prices :product="product" />
          </div>
          <span v-else class="ui-badge bg-warning-100 text-warning-700">
            {{ !isInStock ? $t.i19outOfStock : $t.i19inactive }}
          </span>
        </div>
        <button
          v-if="isActive && !hasVariations"
          class=":uno: hidden md:block ui-btn-sm ui-btn-primary
          absolute -top-6 left-0 w-full rounded-none
          opacity-0 group-hover:opacity-100 transition -z-10 group-hover:z-10"
          @click.prevent="addProductToCart(product)"
        >
          <span class="inline-block h-4 w-4 leading-none text-base text-center
            bg-on-primary text-primary opacity-80 rounded-full mr-1">
            &plus;
          </span>
          {{ $t.i19addToCart }}
        </button>
      </div>
    </ALink>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { watchOnce, useElementHover } from '@vueuse/core';
import { addProductToCart } from '@@sf/state/shopping-cart';
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
  isInStock,
  isActive,
  discountPercentage,
  hasVariations,
} = useProductCard(props as UseProductCardProps);
const card = ref<HTMLElement | null>(null);
const isHovered = useElementHover(card);
const wasHoveredOnce = ref(false);
watchOnce(isHovered, () => {
  wasHoveredOnce.value = true;
});
</script>
