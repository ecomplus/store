<template>
  <aside class="flex flex-col h-screen bg-white">
    <header class="px-6 py-4 flex justify-end items-center gap-3
      shadow ring-1 ring-black/5 z-10">
      <span class="text-right text-base text-base-600 font-medium">
        {{ $t.i19myShoppingCart }}
      </span>
      <span class="min-w-[3rem] text-right">
        <span class="ui-badge-pill-lg">
          {{ totalItems }}
        </span>
      </span>
    </header>
    <article class="grow overflow-y-auto bg-base-50">
      <div v-if="freeShippingFromValue" class="text-sm text-center">
        <div
          v-if="freeShippingFromValue > shoppingCart.subtotal"
          class="p-3 secondary-subtle"
        >
          {{ $t.i19add$1ToEarn.replace('$1',
            $money(freeShippingFromValue - shoppingCart.subtotal)) }}
          <strong class="lowercase">{{ $t.i19freeShipping }}</strong>
        </div>
        <div v-else class="p-3 bg-success-50 text-success-800">
          <i class="text-success-900 i-check mr-1"></i>
          {{ $t.i19freeShippingFrom }} {{ $money(freeShippingFromValue) }}
        </div>
      </div>
      <ul class="px-4 pt-4 pb-2">
        <li v-for="(item, i) in shoppingCart.items" :key="i">
          <CartItem :item="item" class="mb-3" />
        </li>
      </ul>
    </article>
    <footer class="px-5 pt-4 pb-3 ring-2 ring-black/5 z-10">
      <div class="grid grid-cols-5 gap-3 items-center text-right">
        <div class="col-span-2">
          {{ $t.i19subtotal }}
        </div>
        <Prices
          :price="shoppingCart.subtotal"
          is-literal
          class="col-span-3 text-lg"
        />
      </div>
      <CheckoutLink class="ui-btn-lg ui-btn-primary w-full text-right my-2.5">
        <i class="i-check mr-2"></i>
        {{ $t.i19checkout }}
      </CheckoutLink>
      <a
        href="#"
        @click.prevent="emit('close')"
        class="ui-link text-base-500 hover:text-base-700 text-sm"
      >
        <i class="i-arrow-left mr-1"></i>
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
