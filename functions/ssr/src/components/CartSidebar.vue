<template>
  <aside class="flex h-screen flex-col bg-white">
    <header class="z-10 flex items-center justify-end gap-3
      px-6 py-4 shadow ring-1 ring-black/5">
      <span class="text-base-600 text-right text-base font-medium">
        {{ $t.i19myShoppingCart }}
      </span>
      <span class="min-w-[3rem] text-right">
        <span class="ui-badge-pill-lg">
          {{ totalItems }}
        </span>
      </span>
    </header>
    <article class="bg-base-50 grow overflow-y-auto">
      <div v-if="freeShippingFromValue" class="text-center text-sm">
        <div
          v-if="freeShippingFromValue > shoppingCart.subtotal"
          class="secondary-subtle p-3"
        >
          {{ $t.i19add$1ToEarn.replace('$1',
            $money(freeShippingFromValue - shoppingCart.subtotal)) }}
          <strong class="lowercase">{{ $t.i19freeShipping }}</strong>
        </div>
        <div v-else class="bg-success-50 text-success-800 p-3">
          <i class="text-success-900 i-check mr-1"></i>
          {{ $t.i19freeShippingFrom }} {{ $money(freeShippingFromValue) }}
        </div>
      </div>
      <ul class="px-4 pb-2 pt-4">
        <li v-for="(item, i) in shoppingCart.items" :key="i">
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
      <CheckoutLink
        to="checkout"
        class="ui-btn-lg ui-btn-primary my-2.5 w-full text-right"
      >
        <i class="i-check mr-2"></i>
        {{ $t.i19checkout }}
      </CheckoutLink>
      <a
        href="#"
        @click.prevent="emit('close')"
        class="ui-link text-base-500 hover:text-base-700 text-sm"
      >
        <i class="i-arrow-right mr-1 rotate-180"></i>
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

const emit = defineEmits(['close']);
</script>
