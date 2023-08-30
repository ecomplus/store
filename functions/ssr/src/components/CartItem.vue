<template>
  <article class="relative bg-white shadow-sm">
    <ALink :href="link" class="flex items-center gap-5 p-4 group">
      <AImg
        v-if="image"
        :picture="image"
        :alt="title"
        class="w-20 h-20 object-cover"
      />
      <p class="py-2 flex-auto text-sm text-base-700
        group-hover:text-base-900 group-hover:underline">
        {{ title }}
      </p>
    </ALink>
    <button
      v-if="cartItem._id"
      @click.stop="removeCartItem(cartItem._id)"
      class="absolute top-0 right-0 p-2 opacity-70 hover:opacity-100"
      :aria-label="$t.i19remove"
    >
      <span class="w-5 h-5 text-sm leading-none flex flex-col justify-center
        rounded-full border-3 text-danger-800 border-danger-700/30">
        <i class="i-close my-0 mx-auto"></i>
      </span>
    </button>
    <div class="flex justify-between items-center border-t-2 border-base-100">
      <div class="border-r-2 border-base-100">
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
        class="px-4 py-2.5 text-[95%] text-right"
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
