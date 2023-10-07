<template>
  <section class="ui-section relative grid grid-cols-1 items-start
    gap-5 md:gap-4 lg:grid-cols-4 2xl:gap-6">
    <div class="w-full lg:col-span-3">
      <template v-if="product.pictures?.length">
        <ImagesGallery :pictures="product.pictures" />
      </template>
      <slot name="description" />
    </div>
    <div class="sticky top-0 py-4">
      <h1 class="ui-text-brand text-base-700 text-xl">
        {{ title }}
      </h1>
      <div v-if="isActive" class="mt-5">
        <Prices :product="product" is-big is-literal />
        <QuantitySelector
          v-model="quantity"
          :min="product.min_quantity"
          :max="product.quantity"
          class="border-base-100 my-4 inline-block rounded border-2"
        />
        <CheckoutLink
          class="ui-btn-lg ui-btn-primary block w-full text-center"
          to="checkout"
          :cart-item="{
            product_id: product._id,
            quantity,
          }"
        >
          {{ $t.i19buy }}
        </CheckoutLink>
        <button
          class="ui-btn-lg ui-btn-contrast mt-2 block w-full"
          @click.prevent="addProductToCart(product)"
        >
          {{ $t.i19addToCart }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Products } from '@cloudcommerce/api/types';
import { addProductToCart } from '@@sf/state/shopping-cart';
import { useProductCard } from '@@sf/composables/use-product-card';
import CheckoutLink from '@@sf/components/CheckoutLink.vue';
import QuantitySelector from '@@sf/components/QuantitySelector.vue';
import Prices from '~/components/Prices.vue';
import ImagesGallery from '~/components/ImagesGallery.vue';

export interface Props {
  product?: Products;
}

const props = withDefaults(defineProps<Props>(), {
  product: () => globalThis.$storefront.apiContext?.doc as Products,
});
const {
  product,
  title,
  isActive,
} = useProductCard<Products>(props);
const quantity = ref(product.min_quantity || 1);
</script>
