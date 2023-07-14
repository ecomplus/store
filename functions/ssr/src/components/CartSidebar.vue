<template>
  <aside class="flex flex-col h-full">
    <header class="px-6 py-4 flex justify-end items-center gap-3">
      <span class="text-right text-base text-base-600 font-medium">
        {{ $t.i19myShoppingCart }}
      </span>
      <span class="ui-badge-lg">
        {{ totalItems }}
      </span>
    </header>
    <article class="grow bg-base-50">
    </article>
    <footer class="px-6 py-4">
    </footer>
  </aside>
</template>

<script setup lang="ts">
import { totalItems } from '@@sf/state/shopping-cart';
</script>
