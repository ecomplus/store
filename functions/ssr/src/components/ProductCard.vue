<template>
  <article :data-sku="product.sku">
    {{ product.name }} {{ product._id }}
  </article>
</template>

<script setup lang="ts">
import type { Products, SearchItems } from '@cloudcommerce/types';

export interface Props {
  product: Products | SearchItems[0];
}

defineProps<Props>();
</script>
