<template>
  <aside class="flex flex-col h-full">
    <header class="px-6 py-4 flex justify-end items-center gap-3">
      <span class="text-right text-base text-base-600 font-medium">
        {{ $t.i19myShoppingCart }}
      </span>
      <span class="ui-badge-pill-lg">
        {{ totalItems }}
      </span>
    </header>
    <article class="grow bg-base-50 border-t-2 border-b-2 border-base-100">
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
    </article>
    <footer class="p-5 shadow">
    </footer>
  </aside>
</template>

<script setup lang="ts">
import { freeShippingFromValue } from '@@sf/state/modules-info';
import { shoppingCart, totalItems } from '@@sf/state/shopping-cart';
</script>
