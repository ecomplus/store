<template>
  <section class="ui-section relative grid grid-cols-1 items-start
    gap-5 md:gap-4 lg:grid-cols-4 2xl:gap-6">
    <div class="w-full lg:col-span-3">
      <template v-if="product.pictures?.length">
        <ImagesGallery :pictures="product.pictures" />
      </template>
    </div>
    <div class="lg:sticky-header:translate-y-14 top-0 py-4
      transition-transform lg:sticky">
      <h1 class="ui-text-brand text-secondary-900 text-lg">
        {{ title }}
      </h1>
      <div v-if="isActive" class="mt-5">
        <Prices :product="product" is-big is-literal />
        <SkuSelector
          v-if="product.variations"
          :variations="product.variations"
          v-model:variation-id="variationId"
          class="my-4"
        />
        <Fade slide="down">
          <div v-if="hasSkuSelectionAlert" class="ui-alert inline-block">
            {{ $t.i19selectVariationMsg }}
            <i class="i-arrow-right ml-1 -rotate-90"></i>
          </div>
        </Fade>
        <div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2
          overflow-hidden md:flex-nowrap lg:mt-4 lg:flex-wrap">
          <QuantitySelector
            v-model="quantity"
            :min="product.min_quantity"
            :max="product.quantity"
            class="border-base-100 rounded md:mr-5
            lg:mb-2 lg:mr-auto lg:border-2"
          />
          <CheckoutLink
            class="ui-btn-lg ui-btn-primary grow text-center"
            to="checkout"
            :cart-item="{
              product_id: product._id,
              quantity,
              variation_id: variationId || undefined,
            }"
            :data-tooltip="!isSkuSelected ? $t.i19chooseProductDetailsToBuy : null"
            @click="checkVariation"
          >
            <i class="i-chevron-double-right mr-1"></i>
            {{ $t.i19buy }}
          </CheckoutLink>
          <button
            class="ui-btn-lg ui-btn-contrast grow"
            @click.prevent="addToCart"
            :data-tooltip="!isSkuSelected ? $t.i19chooseProductDetailsToBuy : null"
          >
            {{ $t.i19addToCart }}
          </button>
        </div>
      </div>
    </div>
    <div class="w-full lg:col-span-3">
      <slot name="description" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ResourceId, Products } from '@cloudcommerce/api/types';
import { useUrlSearchParams } from '@vueuse/core';
import { addProductToCart } from '@@sf/state/shopping-cart';
import { useProductCard } from '@@sf/composables/use-product-card';
import CheckoutLink from '@@sf/components/CheckoutLink.vue';
import QuantitySelector from '@@sf/components/QuantitySelector.vue';
import Prices from '~/components/Prices.vue';
import ImagesGallery from '~/components/ImagesGallery.vue';
import SkuSelector from '~/components/SkuSelector.vue';

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
const params = useUrlSearchParams('history');
const hasSkuSelectionAlert = ref(false);
const variationId = ref<ResourceId | null>(null);
watch(variationId, (_variationId) => {
  if (_variationId) {
    params.var = _variationId;
    hasSkuSelectionAlert.value = false;
  }
});
onMounted(() => {
  watch(params, ({ var: variation }) => {
    if (typeof variation === 'string' && variation) {
      variationId.value = variation as ResourceId;
    }
  }, { immediate: true });
});
const isSkuSelected = computed(() => {
  return Boolean(!product.variations?.length || variationId.value);
});
const checkVariation = (ev?: Event) => {
  if (!isSkuSelected.value) {
    if (ev) ev.preventDefault();
    hasSkuSelectionAlert.value = true;
  } else {
    hasSkuSelectionAlert.value = false;
  }
  return !hasSkuSelectionAlert.value;
};
const addToCart = () => {
  if (!checkVariation()) return;
  addProductToCart(product, variationId.value ? variationId.value : undefined);
};
</script>
