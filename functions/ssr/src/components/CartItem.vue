<template>
  <article class="relative bg-white shadow-sm">
    <ALink :href="link" class="group flex items-center gap-5 p-4">
      <AImg
        v-if="image"
        :picture="image"
        :alt="title"
        class="h-20 w-20 object-cover"
      />
      <p class="text-base-700 group-hover:text-base-900 flex-auto py-2
        text-sm group-hover:underline">
        {{ title }}
      </p>
    </ALink>
    <button
      v-if="cartItem._id"
      @click.stop="removeCartItem(cartItem._id)"
      class="absolute right-0 top-0 p-2 opacity-70 hover:opacity-100"
      :aria-label="$t.i19remove"
    >
      <span class="border-3 text-danger-800 border-danger-700/30 flex h-5 w-5 flex-col
        justify-center rounded-full text-sm leading-none">
        <i class="i-close mx-auto my-0"></i>
      </span>
    </button>
    <div class="border-base-100 flex items-center justify-between border-t-2">
      <div class="border-base-100 border-r-2">
        <QuantitySelector
          v-model="cartItem.quantity"
          :min="cartItem.min_quantity"
          :max="cartItem.max_quantity"
        />
      </div>
      <Prices
        :base-price="cartItem.base_price"
        :price="finalPrice"
        :has-cashback="false"
        :has-price-options="false"
        class="px-4 py-2.5 text-right text-[95%]"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { removeCartItem } from '@@sf/state/shopping-cart';
import {
  type Props as UseCartItemProps,
  useCartItem,
} from '@@sf/composables/use-cart-item';
import QuantitySelector from '@@sf/components/QuantitySelector.vue';
import Prices from '~/components/Prices.vue';

export type Props = UseCartItemProps;

const props = defineProps<Props>();
const {
  cartItem,
  title,
  link,
  image,
  finalPrice,
} = useCartItem(props);
</script>
