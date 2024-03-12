<template>
  <article
    ref="card"
    :data-sku="product.sku"
    class="group relative mx-auto h-full max-w-[350px] px-0.5 py-3 hover:z-[1]"
  >
    <ALink
      :href="link"
      prefetch="visible"
      class="flex h-full flex-col overflow-hidden rounded bg-white
      ring-black/5 group-hover:shadow group-hover:ring-1"
    >
      <div class="aspect-square p-2
        transition-transform motion-safe:group-hover:scale-110">
        <div class="relative size-full overflow-hidden
          rounded bg-white group-hover:rounded-none">
          <span v-if="images?.length" class="text-xs text-opacity-70">
            <AImg
              :picture="images[0]"
              :alt="title"
              class="absolute left-0 top-0 block size-full object-cover"
            />
            <AImg
              v-if="!isMobile && images[1] && wasHoveredOnce"
              :picture="images[1]"
              :alt="title"
              class="absolute left-0 top-0 z-10 block size-full
              object-cover text-transparent opacity-0 transition-opacity
              group-hover:opacity-100 motion-safe:duration-300"
            />
          </span>
          <div
            v-else
            class="size-full bg-gradient-to-br from-base-50/20 to-base-100"
          />
        </div>
      </div>
      <span
        v-if="discountPercentage"
        class=":uno: absolute right-2 top-9
        bg-secondary/70 py-0.5 pl-3 pr-1.5 text-xs text-on-secondary
        transition-transform [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]
        group-hover:translate-x-2 group-hover:scale-110"
      >
        -<strong>{{ discountPercentage }}</strong>%
      </span>
      <div class="relative z-10 flex grow flex-col justify-between p-4">
        <component
          :is="headingTag"
          class="line-clamp-2 no-underline ui-link"
          :class="[
            isActive ? 'text-base-700' : 'text-base-500',
            link ? 'group-hover:text-primary group-hover:underline' : null,
          ]"
        >
          {{ title }}
        </component>
        <div class="pt-2">
          <div v-if="isActive">
            <Prices :product="product" />
          </div>
          <span v-else class="bg-warning-100 text-warning-700 ui-badge">
            {{ !isInStock ? $t.i19outOfStock : $t.i19inactive }}
          </span>
        </div>
        <button
          v-if="isActive && !hasVariations"
          class=":uno: absolute -top-6 left-0 -z-10 hidden w-full
          rounded-none opacity-0 transition ui-btn-sm ui-btn-primary
          group-hover:z-10 group-hover:opacity-100 md:block"
          @click.stop.prevent="addProductToCart(product)"
        >
          <span class="mr-1 inline-block size-4 rounded-full
            bg-on-primary text-center text-base leading-none
            text-primary opacity-80">
            &plus;
          </span>
          {{ $t.i19addToCart }}
        </button>
      </div>
    </ALink>
  </article>
</template>

<script setup lang="ts">
import { useElementHover } from '@vueuse/core';
import { addProductToCart } from '@@sf/state/shopping-cart';
import {
  type Props as UseProductCardProps,
  useProductCard,
} from '@@sf/composables/use-product-card';
import { isMobile } from '@@sf/sf-lib';
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
const unwatch = watch(isHovered, () => {
  wasHoveredOnce.value = true;
  unwatch();
});
</script>
