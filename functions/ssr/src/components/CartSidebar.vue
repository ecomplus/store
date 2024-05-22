<template>
  <aside class="flex h-screen flex-col bg-white">
    <header class="z-10 flex items-center justify-end gap-3
      px-6 py-4 shadow ring-1 ring-black/5">
      <span class="text-right text-base font-medium text-base-600">
        {{ $t.i19myShoppingCart }}
      </span>
      <span class="min-w-12 text-right">
        <span class="ui-badge-pill-lg">
          {{ totalItems }}
        </span>
      </span>
    </header>
    <article class="grow overflow-y-auto bg-base-50">
      <div v-if="freeShippingFromValue" class="text-center text-sm">
        <div
          v-if="freeShippingFromValue > shoppingCart.subtotal"
          class="p-3 secondary-subtle"
        >
          {{ $t.i19add$1ToEarn.replace('$1',
            $money(freeShippingFromValue - shoppingCart.subtotal)) }}
          <strong class="lowercase">{{ $t.i19freeShipping }}</strong>
        </div>
        <div v-else class="bg-success-50 p-3 text-success-800">
          <i class="mr-1 text-success-900 i-check"></i>
          {{ $t.i19freeShippingFrom }} {{ $money(freeShippingFromValue) }}
        </div>
      </div>
      <ul class="flex flex-col-reverse px-4 pb-2 pt-4">
        <li v-for="(item, i) in shoppingCart.items" :key="item._id || i">
          <CartItem :item="item" class="mb-3" />
        </li>
      </ul>
    </article>
    <footer class="z-10 px-5 pb-3 pt-4 ring-2 ring-black/5">
      <div class="grid grid-cols-5 items-center gap-3 text-right">
        <div class="col-span-2">
          {{ $t.i19subtotal }}
        </div>
        <Prices :price="shoppingCart.subtotal" class="col-span-3 text-lg" />
      </div>
      <div v-if="!hasShippingCalculator" class="my-2.5 text-right">
        <a
          href="#"
          class="text-base-700 decoration-base-300 ui-link"
          @click.prevent.stop="hasShippingCalculator = true"
        >
          {{ $t.i19calculateShipping }}
          <i class="ml-1 text-base-500 i-truck"></i>
        </a>
      </div>
      <Fade slide="down">
        <ShippingCalculator
          v-if="hasShippingCalculator"
          :shipped-items="shoppingCart.items"
          class="my-2.5 flex flex-wrap justify-end"
          can-auto-submit
        />
      </Fade>
      <CheckoutLink
        to="checkout"
        class="my-2.5 w-full text-right ui-btn-lg ui-btn-primary"
      >
        <i class="mr-2 i-check"></i>
        {{ $t.i19checkout }}
      </CheckoutLink>
      <a
        href="#"
        @click.prevent="emit('close')"
        class="text-sm text-base-500 ui-link hover:text-base-700"
      >
        <i class="mr-1 rotate-180 i-arrow-right"></i>
        {{ $t.i19continueShopping }}
      </a>
    </footer>
  </aside>
</template>

<script setup lang="ts">
import { freeShippingFromValue } from '@@sf/state/modules-info';
import { shoppingCart, totalItems } from '@@sf/state/shopping-cart';
import CheckoutLink from '@@sf/components/CheckoutLink.vue';
import Prices from '~/components/Prices.vue';
import CartItem from '~/components/CartItem.vue';
import ShippingCalculator from '~/components/ShippingCalculator.vue';

const emit = defineEmits(['close']);
const hasShippingCalculator = ref(false);
</script>
