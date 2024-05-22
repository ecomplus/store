<template>
  <article class="relative bg-white shadow-sm">
    <ALink :href="link" class="group flex items-center gap-5 p-4">
      <AImg
        v-if="image"
        :picture="image"
        :alt="title"
        class="size-20 shrink-0 object-cover"
      />
      <p class="flex-auto py-2 text-sm text-base-700
        group-hover:text-base-900 group-hover:underline">
        {{ title }}
      </p>
    </ALink>
    <button
      v-if="cartItem._id"
      @click.stop="removeCartItem(cartItem._id)"
      class="absolute right-0 top-0 p-2 opacity-70 hover:opacity-100"
      :aria-label="$t.i19remove"
    >
      <span class="border-3 flex size-5 flex-col justify-center rounded-full
        border-danger-700/30 text-sm leading-none text-danger-800">
        <i class="mx-auto my-0 i-close"></i>
      </span>
    </button>
    <div class="flex items-center justify-between border-t-2 border-base-100">
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
