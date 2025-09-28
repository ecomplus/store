<template>
  <section class="relative grid grid-cols-1 items-start gap-x-5
    ui-section lg:grid-cols-4 lg:gap-x-4 2xl:gap-x-6">
    <div class="w-full lg:col-span-3">
      <template v-if="product.pictures?.length">
        <ImagesGallery :pictures="product.pictures" class="mb-5" />
      </template>
    </div>
    <div class="top-0 pt-4 transition-transform
      lg:sticky lg:pb-4 lg:sticky-header:translate-y-14">
      <h1 class="text-lg text-secondary-900 ui-text-brand">
        {{ title }}
      </h1>
      <div v-if="isActive" class="mt-5">
        <Prices :product :variation-id is-big is-literal />
        <SkuSelector
          v-if="product.variations"
          :variations="product.variations"
          v-model:variation-id="variationId"
          class="my-4"
        />
        <Fade slide="down">
          <div v-if="hasSkuSelectionAlert" class="inline-block ui-alert">
            {{ $t.i19selectVariationMsg }}
            <i class="ml-1 -rotate-90 i-arrow-right"></i>
          </div>
        </Fade>
        <div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2
          md:flex-nowrap lg:mt-4 lg:flex-wrap">
          <QuantitySelector
            v-model="quantity"
            :min="product.min_quantity"
            :max="product.quantity"
            class="rounded border-base-100 md:mr-5 lg:mr-auto lg:border-2"
          />
          <CheckoutLink
            class="grow text-center ui-btn-lg ui-btn-primary"
            :style="buyCtaColor
              ? `background: ${buyCtaColor}; border-color: ${buyCtaColor}`
              : null"
            to="checkout"
            :cart-item="{
              product_id: product._id,
              quantity,
              variation_id: variationId || undefined,
            }"
            :data-tooltip="!isSkuSelected ? $t.i19chooseProductDetailsToBuy : null"
            @click="checkVariation"
          >
            <i class="mr-1 i-chevron-double-right"></i>
            {{ buyCtaLabel || $t.i19buy }}
          </CheckoutLink>
          <button
            class="grow ui-btn-lg ui-btn-contrast"
            :class="isFailedToCart && 'opacity-60 cursor-not-allowed'"
            :disabled="isFailedToCart"
            @click.prevent="addToCart"
            :data-tooltip="!isSkuSelected ? $t.i19chooseProductDetailsToBuy : null"
          >
            {{ $t.i19addToCart }}
          </button>
        </div>
        <div
          v-if="isFailedToCart"
          class="mx-auto text-balance px-2 pt-2
          text-center text-sm text-warning-800"
        >
          {{ $t.i19loadToCartErrorMsg }}
        </div>
        <div class="mt-6 rounded border-2
          border-base-50 border-t-base-100 p-4 lg:mt-4">
          <ShippingCalculator :shipped-items has-label />
        </div>
      </div>
    </div>
    <div class="w-full lg:col-span-3">
      <slot name="description" />
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  type Props as UseProductDetailsProps,
  useProductDetails,
} from '@@sf/composables/use-product-details';
import { getAbValue } from '@@sf/state/ab-experiment';
import CheckoutLink from '@@sf/components/CheckoutLink.vue';
import QuantitySelector from '@@sf/components/QuantitySelector.vue';
import Prices from '~/components/Prices.vue';
import ImagesGallery from '~/components/ImagesGallery.vue';
import SkuSelector from '~/components/SkuSelector.vue';
import ShippingCalculator from '~/components/ShippingCalculator.vue';

export type Props = UseProductDetailsProps
const props = withDefaults(defineProps<Props>(), {
  canUseUrlParams: true,
});
const {
  product,
  variationId,
  title,
  isActive,
  quantity,
  isSkuSelected,
  hasSkuSelectionAlert,
  checkVariation,
  addToCart,
  isFailedToCart,
  shippedItems,
} = useProductDetails(props);
const buyCtaColor = getAbValue('buyCtaColor');
const buyCtaLabel = getAbValue('buyCtaLabel');
</script>
